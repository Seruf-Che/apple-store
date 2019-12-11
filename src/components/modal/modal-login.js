import React from "react";
import withService from "../hoc/with-service";
import Spinner from "../spinner/spinner";

class ModalLogin extends React.Component {

  state = {
    email: "",
    password: "",
    success: false,
    error: "",
    loading: false
  }

  onChangeHandler = (e) => {
    const {name, value} = e.currentTarget;
    this.setState({
      [name]: value,
      error: ""
    })
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    if(this.state.success) return;
    this.setState({loading: true});
    const {email, password} = this.state;
    const {service, setUser, close} = this.props;

    service.logIn(email, password)
      .then(response => {
        if (response.status === -1) {
          this.setState({error: response.error});
        }
        else {
          setUser(response.user);
          this.setState({success: true});
          setTimeout(()=>close(), 1500);
        }
        this.setState({loading: false});
      }
    );
  }

  render() {
    const {close} = this.props;
    const {email, password, error, success, loading} = this.state;

    return(
      <div className={"modal"} onClick={close}>
        <form
          className={"modal__inner"}
          onClick={e => e.stopPropagation()}
          onSubmit={this.onSubmitHandler}
          action="post">
          {loading ? <Spinner />: ""}
          <div className="modal__header">
            <h2 className="modal__heading">Login</h2>
            <span
            onClick={close}
            className="modal__close">close</span>
          </div>
          <div className="modal__body">
            <input
              type="email"
              placeholder="Your email..."
              name="email"
              value={email}
              onChange={this.onChangeHandler}
              className="input"
              required/>
            <input
              type="password"
              placeholder="Your password..."
              name="password"
              value={password}
              onChange={this.onChangeHandler}
              className="input"
              required/>
          </div>
          <div className="modal__footer">
            <div
              className={`modal__submit-response ${ error ? "modal__submit-response--error" : ""}`}>
              {error ? error : success ? "You have been succefully logged in" : ""}
            </div>
            <button
              type="submit"
              className="button"
              disabled={success}>Log In</button>
          </div>
        </form>
      </div>
    )
  }
}

export default withService(ModalLogin);
