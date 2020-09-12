
var oldobjects = null;
oldobjects = JSON.parse(sessionStorage.getItem('objects'));


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
var small = document.querySelector('.guid_drag');
var Deletebtn = document.getElementById('Delete');
var Resetbtn = document.getElementById('reset_btn');
var widthplusbtn = document.getElementById('width_plus');
var widthminusbtn = document.getElementById('width_minus');
var heightplusbtn = document.getElementById('height_plus');
var heightminusbtn = document.getElementById('height_minus');



// EVENT LISTENERS
svg.addEventListener('dragenter' , dragEndsvg);
svg.addEventListener('dragover' , svgover);
deskSubmit.addEventListener('click' , create);
sample.addEventListener('dragstart' , dragStart);
sample.addEventListener('mousedown' , sampleGetinfo);
btnLine.addEventListener('click' , lineSet);
btnUp.addEventListener('click' , UP);
Deletebtn.addEventListener('click' , Delete);
widthplusbtn.addEventListener('click' , widthplus);
widthminusbtn.addEventListener('click' , widthminus);
heightplusbtn.addEventListener('click' , heightplus);
heightminusbtn.addEventListener('click' , heightminus);




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
var deskselected;
var cal = false;
var lineBuild;
var reset = false;


// GET NEW CORDINATE WHEN SCROLLING WINDOWS TO BE SURE THAT CORDINATE OF SVG WILL NOT MESS UP !!
window.onscroll = function() {
    getcordinate();
}


// RELOAD PAGE WITHOUT SAVING SVG ELEMENT
Resetbtn.onclick = () => {
    reset = true;
    window.location.reload();
}


// CHECK WHICH ELEMENT SELECTED AND CHANGE STYLE
function checkSelectItem () {
    if(selectpolyid) {
        if(deskselected) {
            deskselected.style.fill = "";
            deskselected.style.filter="";
        }
        deskselected = document.getElementById(selectpolyid);
        deskselected.style.fill = "#6e2503";
        deskselected.style.filter="url(#f1)";
    }
}
setInterval(checkSelectItem , 10);



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
        polygon.setAttribute("stroke-width" ,8);
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
        line.setAttribute("id" ,"line"+this.lineid);
        line.setAttribute("x1" ,x1);
        line.setAttribute("y1" ,y1);
        line.setAttribute("x2" ,x2);
        line.setAttribute("y2" ,y2);
        line.setAttribute("style" ,"stroke:rgb(0,0,0);stroke-width:4");
        this.line.push({
            id:"line"+this.lineid,
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


function Delete () {
    objects.polygon.forEach(el => {
        if(el.id == selectpolyid){
            console.log(objects.polygon.indexOf(el))
            objects.polygon.splice(objects.polygon.indexOf(el),1);
        }
    });
    selectpolyid = null;
    deskselected.remove();
}

// GET CORDINATE OF OFFSET FORM TOP AND LEFT (USE FOR UPDATE CORDINATE WHEN USER SCROLL IN THE SITE )
function getcordinate() {
    rect = svg.getBoundingClientRect();
    rectTop = rect.top;
    rectLeft = rect.left;
}

//MAKE CHANGE TO THE BUTTON OF THE WALL OR LINE AFTER CLICK IT AND SET LIN VARIABLE TO TRUE FOR FUNCTIONALLITY
function lineSet () {
    lin = true;
    btnLine.style.transform ="scale(1.1)";
    btnLine.style.backgroundColor = "purple";
    btnLine.style.boxShadow = "3px 3px 4px black"
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
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            el.point = newpoint;
        }
    });
}

// WHEN USER SELECT BUTTON THIS FUNCTIONS GET THE SELECTED ELEMENT (DESK) AND CALL SETWIDTHHEIGHT FUNCTION ON IT
function widthplus () {
    var selected = document.getElementById(selectpolyid);
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            base = el.baserotate;
            rotate = el.rotate;
        }
    }); 

    newWidhpoint = setWidthHieght(base , 10 , 0);
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            el.baserotate = newWidhpoint;
        }
    }); 
    var newpoint = objects.rotatePolygon(newWidhpoint, rotate);
    selected.setAttribute("points" ,newpoint );
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            el.point = newpoint;
        }
    });
}

function widthminus () {
    var selected = document.getElementById(selectpolyid);
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            base = el.baserotate;
            rotate = el.rotate;
        }
    }); 

    newWidhpoint = setWidthHieght(base , -10 , 0);
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            el.baserotate = newWidhpoint;
        }
    }); 
    var newpoint = objects.rotatePolygon(newWidhpoint, rotate);
    selected.setAttribute("points" ,newpoint );
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            el.point = newpoint;
        }
    });
}

function heightplus () {
    var selected = document.getElementById(selectpolyid);
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            base = el.baserotate;
            rotate = el.rotate;
        }
    }); 

    newWidhpoint = setWidthHieght(base , 0 , 10);
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            el.baserotate = newWidhpoint;
        }
    }); 
    var newpoint = objects.rotatePolygon(newWidhpoint, rotate);
    selected.setAttribute("points" ,newpoint );
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            el.point = newpoint;
        }
    });
}

function heightminus () {
    var selected = document.getElementById(selectpolyid);
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            base = el.baserotate;
            rotate = el.rotate;
        }
    }); 

    newWidhpoint = setWidthHieght(base , 0 , -10);
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            el.baserotate = newWidhpoint;
        }
    }); 
    var newpoint = objects.rotatePolygon(newWidhpoint, rotate);
    selected.setAttribute("points" ,newpoint );
    objects.polygon.forEach(el => {
        if(el.id == selected.getAttribute('id')){
            el.point = newpoint;
        }
    });
}



// CHANGE WIDTH AND HEIGHT OF THE DESK THAT CALL ON THE FUNCTION ABOVE
function setWidthHieght (point,addW ,addH ) {
            var splitBase;
            var newpoint = [];
            splitBase = point.split(' ').map(el => {
                return  [Number(el.split(',')[0]) , Number(el.split(',')[1])] ;
            });
            splitBase[0][0] = splitBase[0][0] - (addW / 2);
            splitBase[0][1] = splitBase[0][1] - (addH / 2);
            splitBase[1][0] = splitBase[1][0] + (addW / 2);
            splitBase[1][1] = splitBase[1][1] - (addH / 2);
            splitBase[2][0] = splitBase[2][0] + (addW / 2);
            splitBase[2][1] = splitBase[2][1] + (addH / 2);
            splitBase[3][0] = splitBase[3][0] - (addW / 2);
            splitBase[3][1] = splitBase[3][1] + (addH / 2);
            splitBase.forEach(el => {
                newpoint.push(el[0].toString().concat(','+el[1].toString())) ;
                });
                newpoint = newpoint.join(' ')
                return newpoint;
}




// PASS THE INFORMATION GLOBALLY WHEN CLICK TO DRAG DESK
function sampleGetinfo(e) {
    var desk_pos = sample.getBoundingClientRect();
    x = e.clientX - desk_pos.left;
    y = e.clientY - desk_pos.top;
    width = desk_pos.width;
    height = desk_pos.height;
}

// CREATE A HTML_CSS (RECTANGLE) DESK FOR DRAGING TO THE SVG
function create (ev) {
    if(max.value && min.value) {
        ev.preventDefault();
        sample.className = 'sample_desk';
        small.style.visibility= 'visible';
        maxValue = max.value;
        minValue = min.value;
    }

}



// OBJECT THAT HOLD ARRAY OF OBJECTS AND METHOD FOR CREATING THEM
objects = new Objects();


//  SET THE INFORMATION OF OBJECT(OLDOBJECT) BEFORE LOADING IN TO THE OBJECT
if (oldobjects) {
// CREATE SVG ELEMENT THAT EXIST BEFOR RELOADING THE PAGE
    oldobjects.polygon.forEach(el => {
        objects.createPolygon(el.point , null , el.min , el.max , el.baserotate , el.rotate);
        
    })
    // objects.createLine (5 , 5 ,100 ,100)
    oldobjects.line.forEach(el => {
        objects.createLine (el.x1 , el.y1 , el.x2 , el.y2);
    })

}





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
    //  THIS FUNCTIONS ATTACH TO THE MOUSEDOWN , MOUSEMOVE,MOUSEUP AND MOUSELEAVE EVENT 
function startDrag(evt) {
    // DRAG POLYGON DESK !!!
    if (evt.buttons == 1 && evt.target.classList[0] == ".draggable") {
        selectElement = evt.target;
        x = evt.clientX - rectLeft;
        y = evt.clientY - rectTop;
        oldPoint = selectElement.getAttribute("points");
    // DRAG CIRCLE CHAIR !!!
    }else if (evt.buttons == 1 && evt.target.classList[0] == ".circle_draggable") {
        console.log(evt.target);
        circ = true;
    // CREATE LINE AS A WALL !!!
    }else if (evt.buttons == 1 && lin == true) {
        Drag = true;
        x = Math.round(evt.clientX - rectLeft);
        y = Math.round(evt.clientY - rectTop);
        switch (x % 4) {
            case 1:
                x = x - 1;
                break;
            case 2:
                x = x - 2;
                break
            case 3:
                x = x + 1;
                break;
        }
        switch (y % 4) {
            case 1:
                y = y - 1;
                break;
            case 2:
                y = y - 2;
                break
            case 3:
                y = y + 1;
                break;
        };
        objects.createLine(x , y , x ,y);

    }
}


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
        objects.polygon.forEach(el => {
            if(el.id == selectElement.getAttribute('id')){
                el.point = newPoint;
            }
        });
    }else if (circ == true) {
        newx = evt.clientX - rectLeft;
        newy = evt.clientY - rectTop;
        evt.target.setAttribute("cx" , newx);
        evt.target.setAttribute("cy" , newy);
    }else if (Drag == true) {
        lineBuild = document.getElementById("line"+objects.lineid);
        newx = Math.floor(evt.clientX - rectLeft);
        newy = Math.floor(evt.clientY - rectTop);
        
        switch (newx % 4) {
            case 1:
                newx = newx - 1;
                break;
            case 2:
                newx = newx - 2;
                break
            case 3:
                newx = newx + 1;
                break;
        }
        switch (newy % 4) {
            case 1:
                newy = newy - 1;
                break;
            case 2:
                newy = newy - 2;
                break
            case 3:
                newy = newy + 1;
                break;
        };
        lineBuild.setAttribute("x2" , newx);
        lineBuild.setAttribute("y2" , newy);
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
        // var lineBuildid = lineBuild.getAttribute('id');
        // console.log(lineBuildid);
        if (lineBuild) {
            objects.line.forEach(el => {
            if(el.id == lineBuild.getAttribute('id')){
                el.x2 = newx;
                el.y2 = newy;
            }
        });
        }
        lineBuild = false;
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
    small.style.visibility="";
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

};

window.onbeforeunload = () => {
    sessionStorage.removeItem('objects');
    if (reset == false) {
    sessionStorage.setItem('objects' , JSON.stringify(objects));
    }
    
}

var checkbtn = document.getElementById('check_objects');
checkbtn.onclick = () => {
    console.log(objects);
};

 



