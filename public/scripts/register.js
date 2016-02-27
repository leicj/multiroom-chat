// 用户注册
var RegisterForm = React.createClass({
  getInitialState: function() {
    return {registername: '', registerpwd: '', registerCheckPwd: ''};
  },
  handleNameChange: function(e) {
    this.setState({registername: e.target.value});
  },
  handlePwdChange: function(e) {
    this.setState({registerpwd: e.target.value});
  },
  handleCheckPwdChange: function(e) {
    this.setState({registerCheckPwd: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var registername = this.state.registername.trim();
    var registerpwd = this.state.registerpwd.trim();
    var registerCheckPwd = this.state.registerCheckPwd.trim();
    if (!registername || !registerpwd || !registerCheckPwd) {
      alert("用户名,密码和确认密码均不能为空!");
      return;
    }
    if (registerpwd !== registerCheckPwd) {
      alert('密码和确认密码必须一致!');
      return;
    }
    $.ajax({
      url: '/reg',
      dataType: 'json',
      type: 'POST',
      data: this.state,
      success: function(rs) {
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
    this.setState({registername: '', registerpwd: '', registerCheckPwd: ''});
  },
  render: function() {
    return (
      <form className="registerForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name"
                value={this.state.registername} onChange={this.handleNameChange} />
        <input type="password" placeholder="Your password"
                value={this.state.registerpwd} onChange={this.handlePwdChange} />
        <input type="password" placeholder="check password"
                value={this.state.registerCheckPwd} onChange={this.handleCheckPwdChange} />
        <input type="submit" value="注册" />
      </form>
    );
  }
});

ReactDOM.render(
  <RegisterForm />,
  document.getElementById('registerForm')
);
