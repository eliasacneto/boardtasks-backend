async function authDocProduction(req, res, next){
  const { passwordTyped } = req.body;
  
  if(req.headers.host.includes("localhost") || req.originalUrl !== '/doc/' ){
    //when user is running on localhost
    return next();
    } 

    if(passwordTyped == process.env.SWAGGER_PASSWORD_DOC){
      //when user typed the right password
      return next();
    }

    if(passwordTyped){
    //when user typed a worng password
    res.status(401).set('Content-Type', 'text/html');
    res.send(Buffer.from(`
    <form method='post'>
      <p style="color: red"> Wrong Password!</p>
      <label for="passwordTyped"> Insert a Documentation Password:</label>
      <input type="password" name="passwordTyped" id="passwordTyped"/>
      <button type="submit">Login</button>
    </form>
    `))
    } else { 
        res.status(200).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
        <form method='post'>
          <label for="passwordTyped"> Doc's Password:</label>
          <input type="password" name="passwordTyped" id="passwordTyped"/>
          <button type="submit">Login</button>
        </form>
        `))
    }  

}

module.exports = authDocProduction