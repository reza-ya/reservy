


// GET ELEMENT OF BUTTON AND INPUT
var svg = document.getElementById('vector');
var rect = svg.getBoundingClientRect();
var min = document.getElementById('min');
var max = document.getElementById('max');
var deskSubmit = document.getElementById('create_desk');
var sample = document.getElementById('sample_desk');
var btnLine = document.getElementById('line_button');

var btnUp = document.getElementById('btn_up');
var btnDown = document.getElementById('btn_down');


// EVENT LISTENERS
svg.addEventListener('dragenter' , dragEndsvg);
svg.addEventListener('dragover' , svgover);
deskSubmit.addEventListener('click' , create);
sample.addEventListener('dragstart' , dragStart);
sample.addEventListener('mousedown' , sampleGetinfo);
btnLine.addEventListener('click' , lineSet);
btnUp.addEventListener('click' , UP);



// GLOBAL VARIABLE
rectTop = rect.top;
rectLeft = rect.left;
selectElement = null;
var width;
var height;
var svgX;
var svgY;
var x;
var y;
var oldPoint;
var newPoint;
var P;
var maxValue;
var minValue;
var circ = false;
var lin;
var Drag;
var selectpolyid = null;
var rotateCriteria = null;
var plusrotate = null;
var calbase;






// CLASS OF OBJECT WITH METHOD FOR CREATE OBJECT
class Objects {
    constructor() {
        this.polygon = [];
        this.circle = [];
        this.line = [];
        this.polyid = 0;
        this.circleid = 0;
        this.lineid = 0;
    }

    // PROTOTYPE FOR CREATE POLYGON
    createPolygon( point , name , min , max ,baserotate, rotate) {
        this.polyid = this.polyid + 1;
        var polygon = document.createElementNS("http://www.w3.org/2000/svg" ,'polygon');
        svg.appendChild(polygon);
        polygon.setAttribute("points" ,point);
        polygon.setAttribute("id" ,"poly"+this.polyid);
        polygon.classList = ".draggable";
        polygon.addEventListener('click' , forEdit)

        this.polygon.push({
            id:"poly"+this.polyid,
            point:point,
            baserotate:baserotate,
            rotate:rotate,
            name:name,
            min:min,
            max:max,
            rotate:rotate
        });
    }

    // PROTOTYPE FOR CREATE CIRCLE
    createCircle (cx ,cy ,r ,fill) {
        this.circleid = this.circleid + 1;
        var circle = document.createElementNS("http://www.w3.org/2000/svg" ,'circle');
        svg.appendChild(circle);
        circle.classList = ".circle_draggable";
        circle.setAttribute("id" ,"circle"+this.circleid);
        circle.setAttribute("cx" ,cx);
        circle.setAttribute("cy" ,cy);
        circle.setAttribute("r" ,r);
        circle.setAttribute("stroke" ,"black");
        circle.setAttribute("stroke-width" ,1);
        circle.setAttribute("fill" ,fill);
        this.circle.push({
            cx:cx,
            cy:cy,
            r:r,
            fill:fill
        });
    }
    // PROTOTYPE FOR CREATE LINE
    createLine (x1 , y1 , x2 , y2 ) {
        this.lineid = this.lineid + 1;
        var line = document.createElementNS("http://www.w3.org/2000/svg" ,'line');
        svg.appendChild(line);
        line.setAttribute("id" ,this.lineid);
        line.setAttribute("x1" ,x1);
        line.setAttribute("y1" ,y1);
        line.setAttribute("x2" ,x2);
        line.setAttribute("y2" ,y2);
        line.setAttribute("style" ,"stroke:rgb(0,0,0);stroke-width:4");
        this.line.push({
            x1:x1,
            y1:y1,
            x2:x2,
            y2:y2
        });
    }

    // PROTOTYPE FOR ROTATE POLYGON
    rotatePolygon (point , Teta ) {
        Teta = (Math.PI/180) * Teta;
        var x = [];
        var y = [];
        var fiftth = [];
        var forth = [];
        var third = [];
        var rotate = [[Math.cos(Teta) ,-(Math.sin(Teta)) ], [Math.sin(Teta) ,Math.cos(Teta) ]];
        let first = point.split(" ");
        let second = first.map(el => el.split(","));
        second.forEach(el => {
            x.push(Number(el[0]));
            y.push(Number(el[1]));
        
        });
        var Midx = (x[1] + x[0])/2;
        var Midy = (y[2] + y[1])/2;
        x = x.map(el =>el =el - Midx);
        y = y.map(el =>el = Midy - el);
        for (let i = 0; i<x.length; i++) {
            third.push([x[i] , y[i]]);
          };
          third = third.map(el => {
            forth.push(matrixMultiply(rotate , el));
          });
          forth.map(el => {
            el[0] =  Midx - el[0];
            el[1] =  Midy - el[1];
          });
          forth.forEach(el => {
          fiftth.push(el[0].toString().concat(','+el[1].toString())) ;
          })
          var rotatePoint =  fiftth.join(" ");
          return rotatePoint;
    }
    
}



function getcordinate() {
    rect = svg.getBoundingClientRect();
    rectTop = rect.top;
    rectLeft = rect.left;
}


function lineSet () {
    lin = true;
    btnLine.style.transform ="scale(1.1)";
    btnLine.style.backgroundColor = "purple";
}


// ROTATE DESK SVG
function UP () {
    var selected = document.getElementById(selectpolyid);
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            base = el.baserotate;
            el.rotate += 10;
            rotate = el.rotate;
        }
    });
    var newpoint = objects.rotatePolygon(base, rotate);
    selected.setAttribute("points" ,newpoint );
}




// PASS THE INFORMATION GLOBALLY WHEN CLICK TO DRAG DESK
function sampleGetinfo(e) {
    var desk_pos = sample.getBoundingClientRect();
    x = e.clientX - desk_pos.left;
    y = e.clientY - desk_pos.top;
    width = desk_pos.width;
    height = desk_pos.height;
}

// CREATE A DESK FOR DRAG
function create (ev) {
    if(max.value && min.value) {
        ev.preventDefault();
        sample.className = 'sample_desk';
        maxValue = max.value;
        minValue = min.value;
    }

}



// OBJECT THAT HOLD ARRAY OF OBJECTS AND METHOD FOR CREATING THEM
objects = new Objects();




    svg.addEventListener('mousedown' , startDrag);
    svg.addEventListener('mousemove' , drag);
    svg.addEventListener('mouseup' , endDrag);
    svg.addEventListener('mouseleave' , endDrag2);  



function forEdit () {
    selectpolyid = this.getAttribute('id');
    rotateCriteria = this.getAttribute('points');
}





// SVG DRAG FUNCTIONALLITY
    // DRAG START
function startDrag(evt) {
    if (evt.buttons == 1 && evt.target.classList[0] == ".draggable") {
        selectElement = evt.target;
        x = evt.clientX - rectLeft;
        y = evt.clientY - rectTop;
        oldPoint = selectElement.getAttribute("points");
    }else if (evt.buttons == 1 && evt.target.classList[0] == ".circle_draggable") {
        console.log(evt.target);
        circ = true;
    }else if (evt.buttons == 1 && lin == true) {
        Drag = true;
        x = evt.clientX - rectLeft;
        y = evt.clientY - rectTop;
        objects.createLine(x , y , x ,y);

    }
}
var cal = false;

    // DRAG ITSELF
function drag(evt) {
    if (selectElement) {
        selectElement.style.cursor = "grabbing";
        newx = evt.clientX - rectLeft;
        newy = evt.clientY - rectTop;
        addx = newx - x;
        addy = newy - y;
        objects.polygon.forEach(el => {
            if(el.id == selectElement.getAttribute('id')){
                el.baserotate;
                calbase = addPiont(el.baserotate , addx ,addy);
                cal = true;
            }
        });
        
        newPoint = addPiont(oldPoint , addx ,addy);
        selectElement.setAttribute("points" , newPoint);
    }else if (circ == true) {
        newx = evt.clientX - rectLeft;
        newy = evt.clientY - rectTop;
        evt.target.setAttribute("cx" , newx);
        evt.target.setAttribute("cy" , newy);
    }else if (Drag == true) {
        var line = document.getElementById(objects.lineid);
        newx = evt.clientX - rectLeft;
        newy = evt.clientY - rectTop;
        line.setAttribute("x2" , newx);
        line.setAttribute("y2" , newy);
    }

}

    // DRAG END
function endDrag(evt) {
        if (cal == true) {
            objects.polygon.forEach(el => {
            if(el.id == selectElement.getAttribute('id')){
                el.baserotate;
                el.baserotate = calbase;
            }
        });
        cal = false;
            }
        selectElement ? selectElement.style.cursor = "grab" :
        oldPoint = null;
        selectElement = null;
        circ = false;
        Drag = false;
}

function endDrag2(evt) {
        selectElement ? selectElement.style.cursor = "grab" :
        oldPoint = null;
        selectElement = null;
        circ = false;
        Drag = false;
        lin = false;
        btnLine.style.transform ="scale(1)";
        btnLine.style.backgroundColor = "";
}
// SVG DRAG FUNCTIONALLITY END






// FUNCTION THAT ADD POINT OF POLYGON ELEMENTS
function addPiont (piont , addx ,addy) {
    let x = [];
    let y = [];
    let first = piont.split(" ");
    let second = first.map(el => el.split(","));
    second.forEach(el => {
        x.push(Number(el[0]));
        y.push(Number(el[1]));
    
    })
   x = x.map(el =>el = el + addx).map(el => el.toString());
   y = y.map(el =>el = el + addy).map(el => el.toString());
   var newpoint = [];
   for (let i = 0; i<x.length; i++) {
     newpoint.push(x[i].concat(","+y[i]))
   }
   newpoint = newpoint.join(" ");
   return newpoint;
}

// FUNCTION FOR CALCULATE CORDINATE OF POLYGON WITH REGARD TO POSITION OF CLICK
function calCordinate (x , y , svgX , svgY , width , height ) {
    var xplus = width - x;
    var yplus = height - y;
    result = `${svgX - x},${svgY - y} ${svgX + xplus},${svgY - y} ${svgX + xplus},${svgY + yplus} ${svgX - x},${svgY + yplus}`;
    return result;
}



//  DRAG AND DROP DESK
function dragStart () {
    setTimeout(() => sample.className += ' invisable' , 0)
}


function svgover (e) {
    e.preventDefault();
    
}

function dragEndsvg (e) {
    sample.ondragend = function(e)  {
        svgX = e.clientX - rectLeft;
        svgY = e.clientY - rectTop;
        P = calCordinate(x , y , svgX , svgY , width , height);
        objects.createPolygon(P , null , minValue , maxValue ,P , 0);
        objects.polygon.forEach(el => {
            if(el.point == P){
                var element = document.getElementById(el.id);

                selectpolyid = el.id;

            }
        });
        
    }
}
//  DRAG AND DROP DESK END


// MULTIPLY MATRIX FUNCTION 
function matrixMultiply (matrixA , matrixB) {
    var error = 0;
    var first = 0;
    var array = [];
matrixA.forEach(el => {
    if(el.length !== matrixA[0].length) {
        error = 1;
        
    }}) ;

    if (error !== 0) {
        return error;
        
    }else if (matrixA.length !== matrixB.length) {
        error = 2;
        return error;

    }else {

    for (var i = 0; i < matrixA.length; i++) {
        for (var j = 0; j < matrixB.length ; j++) {
           first = first + matrixA[i][j] * matrixB[j];
            
        }
        array.push(first);
        first = 0;
    }
        return array;

    }

}





 


