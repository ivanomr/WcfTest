import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import './Login.css';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate   } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    Id: yup.string().required("el usuario es requerido"),
    PWD: yup.string().required("el pwd es requerido"),
  }).required();

export function Login(){
    const navigate = useNavigate();
    const [loginState,SetLoginState]=useState(true);
    
    useEffect(()=>{
        
    },[]);

    const {register,handleSubmit, formState:{ errors }}=useForm({
        resolver: yupResolver(schema)
      });

    const onSubmit = async (formData) => {
        const settings = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body:JSON.stringify(formData),
            redirect: "follow"
        };
        const response = await fetch(`${import.meta.env.VITE_URL_API}Autentication`,settings)
        if(response.status!==200){
            SetLoginState(false);
            return;
        }
    
        const data = await response.json();
        SetLoginState(true);
        localStorage.setItem("tkn_info",JSON.stringify(data));
        
        navigate("/testWcf");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md d-flex justify-content-center flex-column align-items-center">
                    <h1 className="mt-5">Response test ;)</h1>
                    <small>Bienvenido 👋</small>
                    <form className="col-md-4 mt-5 shadow-lg p-5 mb-5 bg-body rounded" onSubmit={handleSubmit(onSubmit)}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>🧑🏻‍💻</InputGroup.Text>
                            <Form.Control
                            placeholder="USU"
                            {...register("Id")}
                            />
                        </InputGroup>
                        <p>{errors.Id?.message}</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Text >🗝️</InputGroup.Text>
                            <Form.Control
                            type="password"
                            placeholder="PWD"
                            {...register("PWD")}
                            />
                        </InputGroup>
                        <p>{errors.PWD?.message}</p>
                        <button type="submit" className='btn btn-primary form-control'>Entrar</button>

                        {
                            loginState ||
                            <Alert className='mt-5' key="danger" variant="danger">
                                ❌ Usuario o contraseña incorrecta
                            </Alert>
                        }
                    </form>                        
                </div>
            </div>
        </div>
    )
}