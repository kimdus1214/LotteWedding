const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const mongoClient = require('mongodb').MongoClient;

const app = express();
const port = 5500;
const router = express.Router();

app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static(__dirname + '/'));

let database;

function connectDB() {
    const databaseURL = "mongodb://localhost:27017";
    mongoClient.connect(databaseURL, (err, db) => {
        if(!err){
            const tempdb = db.db('LotteWedding');
            database = tempdb;
            console.log('몽고디비 연결성공');
        }else{
            console.log(err);
        }
    });
}


app.get('/login', (req, res)=>{
    fs.readFile('login.html', 'utf8', (err, data)=>{
        if(!err){
            res.writeHead(200, {'content-type' : 'text/html'});
            res.end(data);
        }else{
            console.log(err);
        }
    })
});
app.get('/loginFail', (req, res)=>{
    fs.readFile('loginFail.html', 'utf8', (err, data)=>{
        if(!err){
            res.writeHead(200, {'content-type' : 'text/html'});
            res.end(data);
        }else{
            console.log(err);
        }
    })
});


//로그인 처리
//회원가입
//http://localhost:5500/member/regist method:POST
router.route('/member/regist').post((req, res) => {
    console.log('/member/regist 호출');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const age = req.body.age;

    console.log(`userid:${userid}, userpw:${userpw}, name:${username}, age:${age}`);

    if(database){
        joinMember(database, userid, userpw, username, age, (err, result) => { 
            if(!err){
                if(result.insertedCount > 0){
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원가입 성공</h2>');
                    res.write('<p>가입이 성공적으로 완료되었습니다.</p>');
                    res.end();
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원가입 실패</h2>');
                    res.write('<p>가입에 실패되었습니다.</p>');
                    res.end();
                }
            }else{
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 실패</h2>');
                res.write('<p>오류가 발생했습니다.</p>');
                res.end();
            }
        });
    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }
});

//로그인 처리
//http://localhost:3000/member/login 
router.route('/member/login').post((req,res)=>{
    console.log('/member/login 호출');
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    console.log(`${userid} , ${userpw}`);

    if(database){
        loginMember(database, userid, userpw, (err, result) => {
            if(!err){
                if(result){
                    console.dir(result);
                    const rsUserid = result[0].userid;
                    const rsUserpw = result[0].userpw;
                    const rsName = result[0].username;
                    const rsAge = result[0].age;
                    console.log(rsUserid, rsUserpw, rsName, rsAge);

                    fs.readFile('loginOK.html','utf-8',(err,data)=>{
                        if(!err){
                            res.writeHead(200,{'content-type' : 'text/html;charset=utf-8'});
                            res.end(data);
                        } else{
                            console.log(err);
                        }
                    });

                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>로그인 실패</h2>');
                    res.write('<p>아이디 또는 비밀번호를 확인하세요.</p>');
                    res.end();
                }
            }else{
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>서버 오류 발생! 로그인에 실패했습니다.</p>');
                res.end();
            }
        });
    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }
});


const loginMember = function(database, userid, userpw, callback){
    console.log('loginMember 호출!');
    const members = database.collection('member');
    members.find({userid:userid, userpw:userpw}).toArray((err, result) =>{
        if(!err){
            if(result.length > 0){
                console.log('사용자를 찾았습니다.');
                callback(null, result);
            }else{
                console.log('일치하는 사용자가 없습니다.');
                callback(null, null);
            }
        }else{
            console.log(err);
            callback(err, null);
        }
    });
};

const joinMember = function(database, userid, userpw, name, age, callback){
    console.log('joinMember 호출');
    const members = database.collection('member');
    members.insertMany([{userid:userid, userpw:userpw, username:name, age:age}], (err, result)=> {
        if(!err){
            if(result.insertedCount > 0){
                console.log(`사용자 document ${result.insertedCount}명 추가 되었음!`);
            }else{
                console.log(`사용자 document에 추가되지 않음`);
            }
            callback(null, result);
        }else{
            console.log(err);
            callback(err, null);
        }
    });
    
}

app.use('/',router);
app.listen(port, ()=>{
    connectDB();
    console.log(`${port} 실행중`);
});