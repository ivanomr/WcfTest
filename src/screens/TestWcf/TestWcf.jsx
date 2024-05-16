import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useNavigate   } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JsonView from '@uiw/react-json-view';
import './TestWcf.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

const schema = yup.object({
    ambiente: yup.string().required("el ambiente es requerido"),
    proyectoId: yup.number("el proyecto id debe ser entero").integer().typeError("el Id del proyecto debe ser entero"),
    jsonData: yup.string().required("los datos de la petición debe tener un formato json y es requerido")
  }).required();

export function TestWcf(){
    const navigate = useNavigate();
    const [lsUrls,setLsUrls]=useState([]);
    const [jsonResponse,setjsonResponse]=useState({});
    const {register,handleSubmit, formState:{ errors }}=useForm({
        resolver: yupResolver(schema)
      });
   

    const _ini = async () => {
        toast.loading('Espere...');
        const strTokeUsu=localStorage.getItem("tkn_info");
        if(strTokeUsu===null){
            navigate("/login");
        }
        
        const tokenUsu=JSON.parse(strTokeUsu);       
        const settings = {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenUsu.token}`
            },
            redirect: "follow"
        };

        try{
            const response = await fetch(`${import.meta.env.VITE_URL_API}Utils/IniciotWcfTest`,settings);
            if(response.status===401){
                localStorage.removeItem("tkn_info");
                navigate("/login");
            }
        
            const data = await response.json();   
            setLsUrls(data.urlsService);
            toast.dismiss();

        }catch(e){
            toast.dismiss();
            toast.error("ocurrió un error al inciar pantalla");            
        }
        
        
    };

    useEffect( () => {   
        _ini();
    },[]);

    const onSubmit = async (formData) => {
        console.log(formData);
        toast.loading('Espere...');
        const strTokeUsu=localStorage.getItem("tkn_info");
        if(strTokeUsu===null){
            navigate("/login");
        }

        const tokenUsu=JSON.parse(strTokeUsu); 
        const settings = {
            method:"POST",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${tokenUsu.token}`
            },
            body:JSON.stringify(formData),
            redirect: "follow"
        };
        
        try{
            const response = await fetch(`${import.meta.env.VITE_URL_API}WcfSTest`,settings);
            if(response.status===401){
                navigate("/login");
                return;
            }
            if(response.status===408){            
                toast.dismiss();
                toast.error('Error de conexión.',{icon:"❌"});
                setjsonResponse({});
                return;
            }
            if(response.status===500){            
                toast.dismiss();
                toast.error('Ocurrio un error con el servicio.',{icon:"❌"});
                setjsonResponse({});
                return;
            }
            const data = await response.json();
            setjsonResponse(data);            
            toast.dismiss();
            toast.success('Listo',{icon:"👍"});
        }catch(e){
            toast.dismiss();
            toast.error("ocurrió un error al invocar servicio");    
        }
        
    
        
    };

    return (
        <Container className='mt-5'>                  
            <Toaster   toastOptions={{
                            success: {
                            style: {
                                background: 'green',
                                color:"white"
                            },
                            },
                            error: {
                            style: {
                                background: 'rgba(255,0,0,0.2)',
                            },
                            },
                        }}
            />
            <form className='mb-4' onSubmit={handleSubmit(onSubmit)}>             
                <Row>
                    <Col md="3">
                    <InputGroup>
                        <InputGroup.Text>#</InputGroup.Text>
                        <Form.Control
                        {...register("proyectoId")}
                        placeholder="ID del proyecto"
                        />                        
                    </InputGroup><br/> 
                    <p>{errors.proyectoId?.message}</p>
                    </Col>
                    <Col md="5">
                        <Form.Select {...register("ambiente")} aria-label="Default select example">
                            <option value="">Ambiente</option>
                            {
                                lsUrls.map( amb => <option key={amb.key} value={amb.key}>{amb.value}</option> )
                            }
                        </Form.Select><br/>
                        <p>{errors.ambiente?.message}</p>
                    </Col>
                </Row>  
                <Row className='mb-2'>
                    <Col className='text-end'>
                        <button className='btnEnviar btn btn-primary' type='submit'>✉️ Enviar</button>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <textarea {...register("jsonData")} className="txtJsonRequest"></textarea><br/>
                        <p>{errors.jsonData?.message}</p>
                    </Col>
                </Row>              
            </form>
            <Container>                
                <h4>Respuesta</h4>
                <Row>
                    <Col md="12">
                        <JsonView 
                            style={{
                                'fontSize': '15px',
                            }} 
                            value={jsonResponse} />
                    </Col>
                </Row>
            </Container>
            
        </Container>
    )
}