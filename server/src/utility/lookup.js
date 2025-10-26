
function getRoleLevel(role){
  switch(role){
    case "viewer":
      return 0;
    case "editor":
      return 1;
    case "admin":
      return 2;
    default:
      return -1;
  }
}


module.exports = { getRoleLevel };
