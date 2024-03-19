import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Checkbox,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  Table,
  Thead,
  Tbody,
  Select,
  Tr,
  Th,
  Td,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,

} from "@chakra-ui/react";

import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import "./Table.scss";
import { useApi } from "../../../hooks/useApi";
import ErrorAlert from "../Alert/ErrorAlert";
import SuccessAlert from "../Alert/SuccessAlert";
import { useNavigate } from "react-router-dom";



export default function CustomTable({
  headers = [],
  selected = [],
  selectable = false,
  bg = "secondary.card",
  color = "gray.800",
  source = "employee"
}) {
  const [items, setItems ] = useState([]);
  // let itemsIds = items.map((item) => item.id);
  let [localSelected, setLocalSelected] = useState(selected);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  // const setCheckedItems = (isChecked) => {
  //   setLocalSelected([]);
  //   if (isChecked === true) {
  //     setLocalSelected(itemsIds);
  //   }
  // };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {del, get, post, put } = useApi();

  const navigate = useNavigate();

  const [editId, setEditId] = useState(0);

  const [companyOptions, setCompanyOptions] = useState([]);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [message, setMessage] = useState('')

  const [field_one, setField_one] = useState('');
  const [field_two, setField_two] = useState('');
  const [field_three, setField_three] = useState('');
  const [field_four, setField_four] = useState('');
  const [field_five, setField_five] = useState('');
  const [field_six, setField_six] = useState('');


  const showAlerts = (success=false, msg=undefined)=>{
    msg && setMessage(msg)
    success ? setShowSuccess(true) : setShowError(true); 
  }

 

  const loadItems = async () => {
    switch (source) {
      case 'employee':
        get('employees/')
        .then((res) => setItems(res) ).catch(()=>navigate('/login'))
        get('company/')
        .then((res) => setCompanyOptions(res)).catch(()=>navigate('/login'))
        break;
      case 'company':
        get('company/')
        .then((res) => setItems(res)).catch(()=>navigate('/login'))
        break;
      default: setEditId(0)
     
    }
  }

     
  const loadFieldValues = async (editId) => {
    switch (source) {
      case 'employee':
        get(`employees/${editId}/`)
          .then(({id, name, cpf, vacation_days, entered_at, exited_at, company}) => { setField_one(name); setField_two(cpf); setField_three(vacation_days); setField_four(entered_at);setField_five(exited_at);setField_six(company); setEditId(id); })
          .catch(()=>navigate('/login'))
          break;
      case 'company':
        get(`company/${editId}/`)
          .then(({id, name, cnpj}) => { setField_one(name); setField_two(cnpj); setEditId(id); }).catch(()=>navigate('/login'));
        break;
      default: setEditId(0)
      
    }
  }

  useEffect(() => {
  
    if (editId > 0) {
      loadFieldValues(editId)
    }
  }, [editId])

  useEffect(() => {
   loadItems();

  }, [])

  const setCheckedItem = (item, isChecked) => {
    isChecked
      ? setLocalSelected([...localSelected, item])
      : setLocalSelected(localSelected.filter((i) => i !== item));
  };

  const cleanFieldsAndOpenModal = ()=>{
    const date = new Date().toJSON().slice(0, 10)
    setShowSuccess(false); 
    setShowError(false); 
    setMessage(''); 
    setEditId(0); 
    setField_one(''); 
    setField_two('');
    setField_three('');
    setField_four(date);
    setField_five(''); 
    onOpen();
  }

  const deleteItem = () => {
    switch (source) {
      case 'employee':
        if (editId && editId > 0) {
          del(`employees/${editId}/`)
            .then((res) => { setEditId(0); loadItems(); showAlerts(); }).catch(({response})=>{
              console.log(response)
              showAlerts(false, Object.values(response) + '');
            })
          }
          
          ;
        break;
      
      case 'company':
        if (editId && editId > 0) { 
          del(`company/${editId}/`)
          .then((res) => { setEditId(0); loadItems(); showAlerts() }).catch(({response})=>{
            showAlerts(false, Object.values(response.data) + '');
          })
        }
          
        break;
        default: setEditId(0);
     
    }
  }

  const saveOrUpdate = () => {
    switch (source) {
      case 'employee':
        (editId && editId > 0) ?
          put(`employees/${editId}/`, { name: field_one, cpf: field_two, vacation_days:field_three, ...field_five != '' && {exited_at: field_five}, company: field_six })
          
            .then((res) => { setEditId(0); onClose(); loadItems(); showAlerts(); }).catch(({response})=>{
              showAlerts(false, Object.values(response.data) + '');
            })
        
          : post(`employees/`,{ name: field_one, cpf: field_two, vacation_days:field_three, ...field_five != '' && {exited_at: field_five}, company: field_six })
           
            .then((res) => { setEditId(0); onClose(); loadItems();showAlerts(); })
            .catch(({response})=>{
              showAlerts(false, Object.values(response.data) + '');
            })
          ;
        break;
      
      case 'company':
        (editId && editId > 0) ? put(`company/${editId}/`, { name: field_one, cnpj: field_two })
          .then((res) => { setEditId(0); onClose(); loadItems(); showAlerts() }).catch(({response})=>{
            showAlerts(false, Object.values(response.data) + '');
          })
          : post(`company/`, { name: field_one, cnpj: field_two })
            .then((res) => { setEditId(0); onClose(); loadItems(); showAlerts();}).catch(({response})=>{
              showAlerts(false, Object.values(response.data) + '');
            });
        break;
        default: setEditId(0);
     
    }

  }
  return (
    <>  
    <Stack>
    { showSuccess &&
  
    <Alert status='success'>
        <AlertIcon />
        <AlertTitle>Ação Realizada com sucesso</AlertTitle>
        { message && <AlertDescription>{message}</AlertDescription> } 
      </Alert>
    } 
  
    </Stack>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editId > 0 ? 'Edit' : 'Add'} {source}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack>

            { showError &&
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Um Erro ocorreu</AlertTitle>
        { message && <AlertDescription>{message}</AlertDescription> } 
      </Alert>
}
            </Stack>
            
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} required placeholder={source == 'employee' ? 'First name': 'Company Name' } onChange={(e) => setField_one(e.target.value)} value={field_one} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>{source == 'employee' ? 'CPF' : 'CNPJ'}</FormLabel>
              <Input required onChange={(e) => setField_two(e.target.value)} placeholder={source == 'employee' ? 'CPF' : 'CNPJ'} value={field_two} />
            </FormControl>
            {source=='employee'&& 
            <> 
            <FormControl mt={4}>
            <FormLabel>Dias de Férias</FormLabel>
            <NumberInput value={field_three} onChange={setField_three} defaultValue={1} min={0} max={180}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
          </FormControl>
          { editId > 0 &&
          <FormControl mt={4}>
          <FormLabel>Data de Entrada</FormLabel>
          <Input disabled type="date" onChange={(e)=> setField_four(e.target.value)} placeholder={'Data de Entrada'} value={field_four} />
        </FormControl>}
        <FormControl mt={4}>
        <FormLabel>Data de Saída</FormLabel>
        <Input type="date" onChange={(e)=> setField_five(e.target.value)} placeholder={'Data de Saída'} value={field_five} min={field_four}/>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Empresa</FormLabel>
        <Select placeholder='Selecione uma Empresa' onChange={(e)=> setField_six(e.target.value)} value={field_six}>
         {companyOptions.map((val,key)=> <option key={key} value={val.id}>{val.name}</option>)}
       
      </Select>
      </FormControl>


      </>

            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={saveOrUpdate}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        className="custom-table-container"
        width="100%"
        bg={bg}
        color={color}
        rounded="lg"
        p={5}
      >
        <Stack direction="row" alignItems="top" marginBottom="1.5rem">
          <Button onClick={() => { cleanFieldsAndOpenModal() }}>Add {source}</Button>
        </Stack>
        <Table>
          <Thead>
            <Tr>
              {headers.map((head, i) => (
                <Th key={i} data-column={head.id}>
                  {head.title}
                </Th>
              ))}
              <Th data-column="item-actions"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {items && items.map((item, i) => (
              <Tr key={i}>
                {selectable ? (
                  <Td data-column="global-selector">
                    <Checkbox
                      defaultIsChecked={selected.includes(item && item.id)}
                      isChecked={localSelected.includes(item && item.id)}
                      onChange={(e) => setCheckedItem(item && item.id, e.target.checked)}
                    />
                  </Td>
                ) : (
                  ""
                )}
                {Object.keys(item).map((column, c) => (
                  <Td key={c} data-column={headers[c]}>
                    { headers[c] && item[headers[c].id]}
                  </Td>
                ))}
                <Td data-column="item-actions">
                
                    <HStack>
                  <Button 
                 
                  onClick={() => {
                        setEditId(item.id);
                        onOpen();
                      }
                      
                      }><FaPencilAlt/></Button>
                         <Button
                         color="red"
                     
                      onClick={() => {
                        setEditId(item.id);
                        deleteItem();}
                      }><FaRegTrashAlt color="red"/></Button>
                 
                 </HStack>
                   
                    
                
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
