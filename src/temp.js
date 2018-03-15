var google = {
    employees: {
        management: {

        },
        developer: {

        }
    },

    //constructor
    NewEmployee: function (name, role, phone, id) {
        var newEmp = {
            name: name,
            role: role,
            phone: phone,
            id: id,
            //custom
            working: false,
            hours: []
        }
        google.employees[role][name] = newEmp;

        return google.employees[role][name];
    }
}

google.NewEmployee('james', 'developer', 8010, 1);
google.NewEmployee('kim', 'developer', 8010, 2);

google.employees['developer']['james'].clockInout = function () {
  if(this.working){
      this.hours[this.hours.length - 1].push(Date.now());
      this.working = false;
      return `${this.name} clocked out at ${Date.now()}`;
  }else {
      this.hours.push([Date.now()]);
      this.working = true;
      return `${this.name} clocked in at ${Date.now()}`;
  }
};

let log = google.employees['developer']['james'].clockInout();
// console.log(log);
// log = google.employees['developer']['kim'].clockInout();
// console.log(log);

log = Boolean({});
console.log(log);

log = Boolean([]);
console.log(log);

function test(){
    let outer = 'outer';
    let temp = 'temp';

    function innerFunc() {
        // console.log(outer); //ReferenceError: outer is not defined
        let outer = 'inner outer';
        console.log(outer)
        console.log(temp);
    }

    function innerFunc2() {
        console.log(outer)
        console.log(temp);
    }

    innerFunc();
    innerFunc2();
}

test();

//closure 객체 선언
function MyObj(name, msg) {
    this.name = name.toString();
    this.msg = msg.toString();
}

// 새로운 객체/클래스를 생성 할 때,
// 메소드는 일반적으로 객체 생성자에 정의되기보다는 객체의 프로토타입에 연결되어야 한다.
// 그 이유는 생성자가 호출 될 때마다 메서드가 다시 할당되기 때문이다 (즉, 모든 개체가 생성 될 때마다).
// closure에 메서드 연결
(function () {
    this.getName = function () {
        return this.name;
    };
    this.getMsg = function () {
      return this.msg;
    };
}).call(MyObj.prototype);

let myObj = new MyObj('name param', 'msg param');
console.log(myObj);
console.log(myObj.getName());
console.log(myObj.getMsg());

//iife
const MyObj2 = (function (nameParam, msgParam) {
    let name = nameParam.toString();
    let msg = msgParam.toString();

    return {
        getName: function () {
            return name;
        },
        getMsg: function () {
            return msg;
        }
    }
})('iife name', 'iife msg');

// MyObj2.prototype.getSome = function () {
//     return this.msg + this.name;
// };

console.log(MyObj2.getName());
// console.log(MyObj2.getSome());

var ObjCon = function(_x, _y, _z) {
    var x = _x; // private
    var y = _y; // private
    this.z = _z; // public //return 이 생기는 순간 undefined
    console.log('this.z : ', this.z);
    console.log(this);
    var zz = this.z;
    this.add = function () {
        return x + y + this.z; // note x, y doesn't need this.
    };

    return {
        getX: function () {
            return x;
        },
        getZZ: function () {
            return zz;
        },
        getZ: function () {
            console.log(this); //return scope
            return this.z;
        }
    }
};

var objConIntance = new ObjCon(5,4,3); // instantiate an objCon
console.log("=======");
console.log(objConIntance.x); //undefined
console.log(objConIntance.z); //undefined
console.log(objConIntance.getX());
console.log('ZZ : ', objConIntance.getZZ());
console.log('Z : ', objConIntance.getZ());
// console.log(ObjCon.z);
console.log(ObjCon);
// console.log(objConIntance.getZ());

console.log("====promise===");
let _pro = function(param) {

    return new Promise(function (resolve, reject) {
        if(param){
            resolve(param);
        }else {
            reject(param);
        }
    });
};

_pro('promise resolve').then(function(text) {
    console.log("suc "+text);
}, function(text){
    console.log("fail" + text);
});

_pro = new Promise(function (resolve, reject) {
    // resolve({param: "param", param2: "param2"});
    resolve(["param", "param2"]);
});

_pro.then(function(){

    // throw "err excute"; //catch

    for(let arg in arguments) {
        if(arguments.hasOwnProperty(arg)){
            console.log(arguments[arg]);
            let rt = arguments[arg].map(function(ele) {
                console.log(ele);
                return ele + " ele add";
            });

            console.log("rt ", rt);
            console.log("be ", arguments[arg]);
        }
    }

   // console.log(txt + " direct pro");
}).catch(function (e) {
    console.log('e ', e);
});

//console.log("====promise chain===")

_pro = new Promise(function (resolve, reject) {
   resolve("_pro resolve excuted");
});

let _pro2 = new Promise(function (resolve, reject) {
    resolve("_pro222 resolve excuted 222");
});

_pro.then(function () {
    console.log("====promise chain start===")
   console.log(arguments);
   return _pro2;
}).then(function () {
    console.log(arguments);
    return _pro;
}).then(function() {
    console.log(arguments);
    // console.log('this ', this);
    return _pro;
}).then(function () {
    console.log(arguments);
});


