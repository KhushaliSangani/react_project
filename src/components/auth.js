class Auth {
  constructor() {
    if (
      document.cookie.includes("auth") &&
      document.cookie.split("=")[1].length > 0
    ) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    //console.log(document.cookie.split("=")[1]);
  }
  login(cb) {
    this.authenticated = true;
    cb();
  }
  logout(cb) {
    this.authenticated = false;
    cb();
  }
  isAuthenticated() {
    return this.authenticated;
  }
}
export default new Auth();
