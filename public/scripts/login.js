// 用户登录
var LoginForm = React.createClass({
  getInitialState: function() {
    return {loginname: '', loginpwd: ''};
  },
  handleNameChange: function(e) {
    this.setState({loginname: e.target.value});
  },
  handlePwdChange: function(e) {
    this.setState({loginpwd: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var loginname = this.state.loginname.trim();
    var loginpwd = this.state.loginpwd.trim();
    if (!loginname || !loginpwd) {
      return;
    }
    $.ajax({
      url: '/login',
      dataType: 'json',
      type: 'POST',
      data: this.state,
      success: function(rs) {
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
    this.setState({loginname: '', loginpwd: ''});
  },
  handleClick: function(e) {
    e.preventDefault();
    document.getElementById('loginForm').style.display = "none";
    document.getElementById('registerForm').style.display = "block";
  },
  render: function() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name"
                value={this.state.loginname} onChange={this.handleNameChange} />
        <input type="password" placeholder="Your password"
                value={this.state.loginpwd} onChange={this.handlePwdChange} />
        <input type="submit" value="登录" />
        <button type="button" onClick={this.handleClick}>注册</button>
      </form>
    );
  }
});

ReactDOM.render(
  <LoginForm />,
  document.getElementById('loginForm')
);
