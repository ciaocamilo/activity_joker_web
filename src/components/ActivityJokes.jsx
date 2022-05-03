import React, { Component } from 'react'
import axios from 'axios'
class ActivityJokes extends Component {
	constructor(props) {
		super(props)

		this.state = {
            activity_jokes: {},
			joker: {},
            errorMsg: ''
		}
	}

	searchActivityJoke(textInput) {
		axios
			.get('http://localhost:3000/api/activity-jokes/new/' + textInput.current.value)
			.then(response => {
				this.setState({ activity_jokes: response.data, joker: response.data.joker })
			})
			.catch(error => {
				console.log(error)
				this.setState({errorMsg: 'Error en la petición'})
			})
	}

	render() {
		let textInput = React.createRef();
		let onOnclickHandler = (e) => {
			this.searchActivityJoke(textInput);
		};
		const { activity_jokes, joker, errorMsg } = this.state
		return (
			<div>
				<h2 className='title-home'>¡Actividad y chiste del día!</h2><br></br>
				<div className="container">
					<div className="row">
						<div className="col">
							<img src="./nandu.jpg" className="App-logo" alt="logo" />
						</div>
						<div className="col">
							<div className="row">
								<div className="card text-white bg-success mb-3">
									<div className="card-header">Activities</div>
									<div className="card-body">
										<h5 className="card-title">Today we want to</h5>
										<p className="card-text">{activity_jokes.activity}</p>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<div className="row">
										<label for="typeInput" className="form-label">Tipo de actividad</label>
									</div>
									<div className="row">
										<div className="col">
											<input ref={textInput} type="text" className="form-control" id="activity_type" placeholder="recreational"/>
										</div>
										<div className="col">
											<button onClick={onOnclickHandler} type="button" className="btn btn-success">Buscar</button>
										</div>
									</div>
								</div>
								<div className="col">
									<button type="button" className="btn btn-warning">Descargar todos</button>
								</div>
							</div>
						</div>
					</div>
				</div>
                    <table className="default">
						<tr>
							<td>
								<div className="card text-dark bg-light mb-3 card-dialog">
									<div className="card-body">
										<h5 className="card-title">And there is a joke about that...</h5>
									</div>
								</div>
							</td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td>
								<p><b><i>{joker.joke}</i></b></p>
							</td>
						</tr>
					</table>
                {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default ActivityJokes