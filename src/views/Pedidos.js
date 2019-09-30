import React, { useState, useEffect } from 'react';
// MATERIAL - UI
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ToastProvider, useToasts } from 'react-toast-notifications'
// Services
import { httpMethodService } from '../_services/index';
// Components
import DialogFormComponent from '../components/DialogFormComponent';
import InputInsidetableComponent from '../components/InputInsidetableComponent';
import SelectComponent from '../components/SelectComponent';
import TabComponent from '../components/TabComponent';


function Pedidos(props) {

	const search = new URLSearchParams(props.location.search);
	const [articulos, setArticulos] = useState([]);
	const [articulosPedido, setArticulosPedido] = useState([]);
	const [estados, setEstados] = useState([]);
	const [values, setValues] = useState({
		cliente_id: search.get("cliente"),
		articulos: [],
		estado_id: '',
		id: 0
	});
	const [pedidos, setPedidos] = useState([]);
	const [cliente, setCliente] = useState([]);
	const [tituloAccion, setTituloAccion] = useState('Crear Pedido');
	const [nombreAccion, setNombreAccion] = useState('Guardar');

	const [value, setValue] = React.useState(0);
	const theme = useTheme();
	const { addToast } = useToasts()

	function handleChange(event, newValue) {
		setValue(newValue);
		if(newValue===0){
			setTituloAccion('Crear Pedido');
			setNombreAccion('Guardar');
		}	
	}

	function handleChangeIndex(index) {
		setValue(index);
	}

	const columns = [
		{
			name: "id",
			label: "#",
			options: {
				filter: false,
				sort: true,
			}
		},
		{
			name: "estado.nombre",
			label: "Estado",
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
						<button className="btn btn-secondary"
							onClick={() => handleClickOpenEdit(value)}
						>
							Editar
					  </button>
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
				title: "Filtrar",
				reset: "Limpiar filtro",
			},
		},
		onRowsDelete: (event, rowData) => {

			const rows = event.data;
			let dataIndex = rows.map(function (value, index) {
				return value.dataIndex;
			});

			dataIndex = dataIndex.map(item => {
				return pedidos[item].id;
			})

			deletePedido(dataIndex)
		},
		responsive: 'stacked',
	};

	const columnsArticulos = [
		{
			name: "id",
			label: "#",
			options: {
				filter: false,
				sort: true,
			}
		},
		{
			name: "codigo",
			label: "Codigo",
			options: {
				filter: false,
				sort: true,
			}
		},
		{
			name: "nombre",
			label: "Nombre",
			options: {
				filter: false,
				sort: true,
			}
		},
		{
			name: "marca.nombre",
			label: "Marca",
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
						<button className="btn btn-secondary"
							onClick={() => addArticulo(tableMeta.rowData)}
						>
							Agregar
					  </button>
					);
				}
			}
		},
	];

	const optionsArticulos = {
		filterType: 'checkbox',
		textLabels: {
			filter: {
				all: "Todos",
				title: "Filtrar",
				reset: "Limpiar filtro",
			},
		},
		onRowsDelete: (event, rowData) => {

			const rows = event.data;
			let dataIndex = rows.map(function (value, index) {
				return value.dataIndex;
			});

			dataIndex = dataIndex.map(item => {
				return pedidos[item].id;
			})

			deletePedido(dataIndex)
		},
		responsive: 'stacked',
		selectableRows: 'none', // <===== will turn off checkboxes in rows,
		filter: false
	};

	function deletePedido(rows) {

		httpMethodService.PUT(`/pedidos/delete`, { index: rows }).then(
			(data) => {
				getPedidos();
			},
			() => {
				// console.log(error);
			},
		);
	}

	useEffect(() => {
		getPedidos();
		getArticulos();
		getEstado();
	}, []);
	// 
	function getArticulos() {
		httpMethodService.GET('/articulos', {
		}).then(
			(data) => {
				const object = data.data.data;
				setArticulos(object)
			},
			() => {
				// console.log(error);
			},
		);
	}
	// 
	function getEstado() {
		httpMethodService.GET('/estados', {
		}).then(
			(data) => {
				const object = data.data.data;
				setEstados(object)
			},
			() => {
				// console.log(error);
			},
		);
	}
	// 
	function getPedidos() {
		httpMethodService.GET('/pedidos', { cliente_id: search.get("cliente") }).then(
			(data) => {
				const object = data.data.data;
				setPedidos(object);
				setCliente(`${object[0].cliente.nombre} ${object[0].cliente.apellido} - ${object[0].cliente.numero_identificacion}`)
			},
			() => {
				// console.log(error);
			},
		);
	}

	function handleClickOpenEdit(index) {
		setTituloAccion("Actualizar Pedido");
		setNombreAccion("Actualizar");
		setValue(1);

		const pedido = (pedidos.filter(item => item.id === index))[0];
		const {estado, id} = pedido;
		getArticulosPorPedido(id)

		setValues({ ...values, 
			estado_id: estado.id,
			id: id
		});
	}

	function handleActionForm() {
		if (values.id > 0) { updatePedido() } else { submitPedido() };
	}

	function submitPedido() {
		httpMethodService.POST(`/pedidos/`, values).then(
			(data) => {
				const object = data.data;

				if (object.status === "success") {
					addToast(object.message, { appearance: 'success' })
					setArticulosPedido([])
				} else {
					addToast(object.message, { appearance: 'error' })
				}

				getPedidos();
			},
			() => {
				// console.log(error);
			},
		);
	}

	function updatePedido() {
		httpMethodService.PUT(`/pedidos/${values.id}`, values).then(
			(data) => {
				const object = data.data;
				alert(object.message)
				getPedidos();
			},
			() => {
				// console.log(error);
			},
		);
	}

	function addArticulo(rowData) {
		if (!(articulosPedido.filter(item => item.id === rowData[0])).length > 0) {
			const data = {
				id: rowData[0],
				codigo: rowData[1],
				nombre: rowData[2],
				marca: rowData[3],
				cantidad: 0
			};
			setArticulosPedido([...articulosPedido, data])
			setValues({ ...values, articulos: [...articulosPedido, data] })
		}
	}

	function getArticulosPorPedido(pedidoId){
		httpMethodService.GET('/pedido-articulos', { pedido_id: pedidoId }).then(
			(data) => {
				let object = data.data.data;

				object.map(item=>{
					item.codigo = item.articulo.codigo;
					item.nombre = item.articulo.nombre;
					item.marca = item.articulo.marca.nombre;
					item.cantidad = item.cantidad || 0;
					item.id = item.id
				})
				
				setArticulosPedido(object)
				setValues({ ...values, articulos: object })
			},
			() => {
				// console.log(error);
			},
		);
	}

	function actualizarCantidad(value, id) {
		articulosPedido.map((row, index) => {
			return row.cantidad = row.id === id ? parseInt(value) : row.cantidad;
		})
		setArticulosPedido(articulosPedido);
	}

	return (

		<div className="mt-5" >
			<div className="col-12 mb-5">
				<Paper elevation={0} className="bg-secondary p-2">
					<Breadcrumbs separator="›" aria-label="breadcrumb">
						<Link className="text-light" href="/home/" >
							Home
						</Link>
						<Typography className="text-light" >Pedidos</Typography>
					</Breadcrumbs>
				</Paper>
			</div>

			<div className="col-12 mt-2 m-1 ">
				<Paper square className="mb-3">
					<Tabs
						value={value}
						indicatorColor="primary"
						textColor="primary"
						onChange={handleChange}
						aria-label="disabled tabs example"
					>
						<Tab label="Listado de pedidos" />
						<Tab label={tituloAccion} />
					</Tabs>
				</Paper>

				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={value}
					onChangeIndex={handleChangeIndex}
				>
					<MUIDataTable
						value={value} index={0} dir={theme.direction}
						title={cliente}
						data={pedidos}
						columns={columns}
						options={options}
					/>
					<div value={value} index={1} dir={theme.direction} className="bg-white">
						<Paper square >
							<div className="container row mr-0 ml-0">
								<div className="col-6 pr-0 pl-0 ">
									<div className="row mr-0 ml-0 mt-3">
										<div className="col-12 pr-0 pl-0 ">
											<SelectComponent
												name="estado"
												placeholder="[Seleccione un estado...]"
												setValues={setValues}
												data={estados}
												value={values.estado_id}
											/>
										</div>
									</div>
									<div className="row mr-0 ml-0 mt-3">
										<div className="col-12 pr-0 pl-0 ">
											<MUIDataTable
												title={`Lista de articulos`}
												data={articulos}
												columns={columnsArticulos}
												options={optionsArticulos}
											/>
										</div>
									</div>
								</div>
								<div className="col-6 pr-0 pl-0 ">
									<div className="row mr-4 ml-4 rounded border border-light bg-light p-3"   >
										<h5>Articulos Seleccionados : {articulosPedido.length}</h5>
										
											<table className={articulosPedido.length > 0 ? 'table': 'table d-none' } >
												<thead>
													<tr>
														<th scope="col">Codigo</th>
														<th scope="col">Nombre</th>
														<th scope="col">Marca</th>
														<th scope="col">Cantidad</th>
													</tr>
												</thead>
												<tbody>
													{
														articulosPedido.map(item =>
															<tr key={item.id}>

																<td>{item.codigo}</td>
																<td>{item.nombre}</td>
																<td>{item.marca}</td>
																<td>
																	<InputInsidetableComponent
																		name={item.id}
																		placeholder={String(item.cantidad)}
																		actualizarCantidad={actualizarCantidad}
																	>
																	</InputInsidetableComponent>
																</td>
															</tr>
														)}
												</tbody>
											</table> 
									</div>
									<div className="row mr-5 mt-4 text-right">
										<div className="col-12  text-right">
											 <button className="btn btn-secondary"
													onClick={() => handleActionForm()}
													disabled={!articulosPedido.length > 0}
												>
													{nombreAccion}
					  						</button> 
											
										</div>
									</div>

								</div>

							</div>
						</Paper>
					</div>
				</SwipeableViews>
			</div>
		</div>
	);
}
export default Pedidos;
