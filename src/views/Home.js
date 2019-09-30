import React, { useState, useEffect } from 'react';
// MATERIAL - UI
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
// Services
import { httpMethodService } from '../_services/index';
import DialogFormComponent from '../components/DialogFormComponent';
import InputFormComponent from '../components/InputFormComponent';

function Home(props) {

	const [titleModal, setTitle] = useState('Crear Cliente');
	const [nameAction, setNameAction] = useState('Guardar');

	const [values, setValues] = useState({
		nombre: '',
		apellido: '',
		numero_identificacion: '',
		id: 0
	});

	const columns = [
		{
			name: "numero_identificacion",
			label: "# de identificacion",
			options: {
				filter: false,
				sort: true,
			}
		},
		{
			name: "nombre",
			label: "Nombres",
			options: {
				filter: false,
				sort: true,
			}
		},
		{
			name: "apellido",
			label: "Apellidos",
			options: {
				filter: false,
				sort: true,
			}
		},
		{
			name: "id",
			label: "Accion",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<div>
							<button class="btn btn-primary" onClick={() => props.history.push(`/pedidos?cliente=${value}`)} >
								Pedidos
					  		</button>
							<button className="btn btn-secondary"
								onClick={() => handleClickOpenEdit(value)}
							>
								Editar
							</button>
						</div>

					);
				}
			}
		},
	];

	const options = {
		filterType: 'checkbox',
		textLabels: {
			filter: {
				all: "Todos",
				title: "Filtros",
				reset: "Limpiar filtro",
			},
		},
		selectableRows: false, // <===== will turn off checkboxes in rows,
		filter: false
	};

	const [clientes, setClientes] = useState([]);
	const [showModal, setModal] = useState(false);

	function getClientes() {
		httpMethodService.GET('/clientes', {
		}).then(
			(data) => {
				const object = data.data.data;
				setClientes(object)
			},
			() => {
				// console.log(error);
			},
		);
	}

	useEffect(() => {
		getClientes();
	}, []);

	function handleClickOpen() {
		setModal(true)
		setTitle("Crear Cliente")
		setNameAction("Actualizar")
		setValues({
			id: 0,
			nombre: '',
			apellido: '',
			numero_identificacion: '',
		});
	}


	function handleClickOpenEdit(index) {
		setModal(true);
		setTitle("Actualizar Cliente");
		setNameAction("Actualizar");

		const cliente = (clientes.filter(item => item.id === index))[0];

		setValues({
			id: cliente.id,
			nombre: cliente.nombre,
			apellido: cliente.apellido,
			numero_identificacion: cliente.numero_identificacion,
		});
	}

	function handleActionDialogForm() {
		const model = {
			numero_identificacion: values.numero_identificacion,
			nombre: values.nombre,
			apellido: values.apellido,
			id: values.id
		}
		if (values.id > 0) { updateCliente(model) } else { submitCliente(model) };
	}

	function submitCliente(model) {
		httpMethodService.POST(`/clientes/`, model).then(
			(data) => {

				if (data.status === "success") {
					const object = data.data;
					alert(object.message)
					setModal(false);
					getClientes();
				} else {
					console.log(data)
				}
			},
			(error) => {

				const warning = error.response.data.error;
				let text = "";

				if (warning.hasOwnProperty('numero_identificacion')) {
					text += warning.numero_identificacion[0];
				} else if (warning.hasOwnProperty('apellido')) {
					text += warning.apellido[0]
				}

				alert(text)
			},
		);
	}

	function updateCliente(model) {
		httpMethodService.PUT(`/clientes/${model.id}`, model).then(
			(data) => {
				const object = data.data;
				alert(object.message)
				setModal(false);
				getClientes();
			},
			() => {
				// console.log(error);
			},
		);
	}

	return (
		<div className="row mt-5 justify-content-center">
			<div className="col-12 mb-5">
				<Paper elevation={0} className="bg-secondary p-2">
					<Breadcrumbs separator="›" aria-label="breadcrumb">
						<Typography className="text-light" >Home</Typography>
					</Breadcrumbs>
				</Paper>
			</div>

			<div className="col-12 mt-2 m-1 text-right">
				<button class="btn btn-secondary" onClick={handleClickOpen} >
					Crear Cliente
				</button>
			</div>
			<DialogFormComponent
				titulo={titleModal}
				btnAction={nameAction}
				showModal={showModal}
				setModal={setModal}
				handleActionDialogForm={handleActionDialogForm}
			>
				<InputFormComponent
					name="numero_identificacion"
					placeholder="Numero identificacion"
					setValuesInput={setValues}
					data={values}
					value={values.numero_identificacion}
				/>
				<InputFormComponent
					name="nombre"
					placeholder="Nombres"
					setValuesInput={setValues}
					data={values}
					value={values.nombre}
				/>

				<InputFormComponent
					name="apellido"
					placeholder="Apellidos"
					setValuesInput={setValues}
					data={values}
					value={values.apellido}
				/>

			</DialogFormComponent>
			<div className="col-12">
				<MUIDataTable
					title={"Lista de clientes"}
					data={clientes}
					columns={columns}
					options={options}
				/>
			</div>
		</div>
	);
}

export default Home;
