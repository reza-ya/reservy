
var oldobjects = null;
oldobjects = JSON.parse(sessionStorage.getItem('objects'));
var condition = null;
oldcondition = JSON.parse(sessionStorage.getItem('condition'));






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
var deskNameInput = document.getElementById('name_desk');
var chair_sample = document.getElementById('circle_chair');
var btnNewDesign = document.getElementById('newDesign');





// EVENT LISTENERS
svg.addEventListener('dragenter', dragEndsvg);
svg.addEventListener('dragover', svgover);
deskSubmit.addEventListener('click', create);
sample.addEventListener('dragstart', dragStart);
// sample.addEventListener('dragstart' , drag)fsdfsdf
sample.addEventListener('mousedown', sampleGetinfo);
btnLine.addEventListener('click', lineSet);
btnUp.addEventListener('click', UP);
Deletebtn.addEventListener('click', Delete);
widthplusbtn.addEventListener('click', widthplus);
widthminusbtn.addEventListener('click', widthminus);
heightplusbtn.addEventListener('click', heightplus);
heightminusbtn.addEventListener('click', heightminus);
chair_sample.addEventListener('mousedown', getinfofcirclechair);
btnNewDesign.addEventListener('click' , newDesign);




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
var deskName;
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
var rectangle_desk = false;
var circle_chair = false;
var condition = [];
var x1 = false;
var x2 =false;
var lineEditeId = 0;
var Icondition;
var svgLineDragPermission = false;
var ifWork = true;
var lineBildy = false;
var lineselected;
var selectLineId;
var oldselectpolyid = null;
var oldselectLineId = null;
var newDesign;
var selectCircleId = null;
var circleSelect = null;
var newDesign = false;



function newDesign (e) {
    var floorCounter = Number(sessionStorage.getItem('floorCounter'));
    console.log(floorCounter)
    if (floorCounter ==0) {
        console.log("if")
        sessionStorage.setItem("floorCounter" , "1" );
        sessionStorage.setItem('floor_1' , JSON.stringify(objects));
    }else {
        floorCounter += 1;
        console.log('else');
        sessionStorage.setItem("floorCounter" , JSON.stringify(floorCounter));
        sessionStorage.setItem("floor".concat(floorCounter.toString()) , JSON.stringify(objects));
        console.log(floorCounter);
    }
    // sessionStorage.setItem('floor'+floorCounter , JSON.stringify(objects));
    // floorCounter += 1;
    // sessionStorage.setItem('floorCounter' , floorCounter);
    newDesign = true;
    window.location.reload();
}


function lineEdite (e) {
    svg.style.cursor = 'grabing';
    ifWork = false;
    svg.addEventListener('mousemove' , svgLineEdit);
    svgLineDragPermission = true;
    var lineEdite = document.getElementById(lineEditeId);
    var drag = true;
    function svgLineEdit (e)  {
        if (drag) {
            if (x1) {
            newx = e.clientX - rectLeft;
            newy = e.clientY - rectTop;
            lineEdite.setAttribute('x1' ,newx );
            lineEdite.setAttribute('y1' ,newy );
            condition[Icondition].splice(0, 1 , newx);
            condition[Icondition].splice(1 , 1 , newy);
            objects.line.forEach(el => {
                if (el.id == lineEditeId) {
                    el.x1 = newx;
                    el.y1 = newy;
                }
            });
            

            }
            if (x2) {
                newx = e.clientX - rectLeft;
                newy = e.clientY - rectTop;
                lineEdite.setAttribute('x2' ,newx );
                lineEdite.setAttribute('y2' ,newy );
                condition[Icondition].splice(2 , 1 , newx);
                condition[Icondition].splice(3 , 1 , newy);

                objects.line.forEach(el => {
                    if (el.id == lineEditeId) {
                        el.x2 = newx;
                        el.y2 = newy;
                    }
                });
            }
        }

       

    }

    svg.onmouseup = (e) => {
        drag = false;
        x1 = false;     
        x2 = false;
        svg.removeEventListener('mousemove' , svgLineEdit);
        svgLineDragPermission = false;
        lineEditeId = 0;
        ifWork = true;
        svg.style.cursor = '';
    }

}




svg.onmousemove = (e) => {
    svgX = e.clientX - rectLeft;
    svgY = e.clientY - rectTop;
    
    if (ifWork) {
        for (i = 0; i<condition.length; i++) {
            var m = Math.abs(condition[i][3] - condition[i][1])/Math.abs(condition[i][2] - condition[i][0]);
            if (((svgX -condition[i][0]) )*((svgX -condition[i][0])) + (svgY - condition[i][1])*(svgY - condition[i][1]) < 20) {
                
                Icondition = i;
                lineEditeId = condition[i][4];
                x1 = true;
                x2 =false;
                svg.addEventListener('mousedown' , lineEdite);
                svg.style.cursor = 'grab';
                break
                    
                
            }else if (((svgX -condition[i][2]) )*((svgX -condition[i][2]) ) + (svgY - condition[i][3])*(svgY - condition[i][3]) < 20) {
                svg.style.cursor = 'grab';
                Icondition = i;
                x1 = false;
                x2 = true;
                lineEditeId = condition[i][4];
                svg.addEventListener('mousedown' , lineEdite);
                break
    
    
            }else {
                svg.style.cursor = '';
                x1 = false;
                x2 = false;
            }
            if (x1 == false && x2 == false) {
                lineEditeId = 0;
                svg.style.cursor = '';
                x1 = false;
                x2 = false;
                svgLineDragPermission = false;
            }
            
        } 
        
    }
    
    
}


// GET NEW CORDINATE WHEN SCROLLING WINDOWS TO BE SURE THAT CORDINATE OF SVG WILL NOT MESS UP !!
window.onscroll = function () {
    getcordinate();
}


// RELOAD PAGE WITHOUT SAVING SVG ELEMENT
Resetbtn.onclick = () => {
    reset = true;
    window.location.reload();
}


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
    createPolygon(point, name, min, max, baserotate, rotate) {
        this.polyid = this.polyid + 1;
        var polygon = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
        svg.appendChild(polygon);
        polygon.setAttribute("points", point);
        polygon.setAttribute("stroke-width", 8);
        polygon.setAttribute("id", "poly" + this.polyid);
        polygon.classList = ".draggable";
        polygon.addEventListener('click', forEdit);

        this.polygon.push({
            id: "poly" + this.polyid,
            point: point,
            baserotate: baserotate,
            rotate: rotate,
            name: name,
            min: min,
            max: max,
            rotate: rotate
        });
    }

    // PROTOTYPE FOR CREATE CIRCLE
    createCircle(cx, cy, r, fill) {
        this.circleid = this.circleid + 1;
        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        svg.appendChild(circle);
        circle.classList = ".circle_draggable";
        circle.setAttribute("id", "circle" + this.circleid);
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", r);
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", 1);
        circle.setAttribute("fill", fill);
        circle.addEventListener("click" , circleforEdit);
        this.circle.push({
            id: "circle" + this.circleid,
            cx: cx,
            cy: cy,
            r: r,
            fill: fill
        });
    }
    // PROTOTYPE FOR CREATE LINE
    createLine(x1, y1, x2, y2) {
        this.lineid = this.lineid + 1;
        var line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        svg.appendChild(line);
        line.setAttribute("id", "line" + this.lineid);
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "5");
        line.addEventListener('click' , lineForEdit);
        // line.style.cursor = "pointer";
        this.line.push({
            id: "line" + this.lineid,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        });
    }

    // PROTOTYPE FOR ROTATE POLYGON
    rotatePolygon(point, Teta) {
        Teta = (Math.PI / 180) * Teta;
        var x = [];
        var y = [];
        var fiftth = [];
        var forth = [];
        var third = [];
        var rotate = [[Math.cos(Teta), -(Math.sin(Teta))], [Math.sin(Teta), Math.cos(Teta)]];
        let first = point.split(" ");
        let second = first.map(el => el.split(","));
        second.forEach(el => {
            x.push(Number(el[0]));
            y.push(Number(el[1]));

        });
        var Midx = (x[1] + x[0]) / 2;
        var Midy = (y[2] + y[1]) / 2;
        x = x.map(el => el = el - Midx);
        y = y.map(el => el = Midy - el);
        for (let i = 0; i < x.length; i++) {
            third.push([x[i], y[i]]);
        };
        third = third.map(el => {
            forth.push(matrixMultiply(rotate, el));
        });
        forth.map(el => {
            el[0] = Midx - el[0];
            el[1] = Midy - el[1];
        });
        forth.forEach(el => {
            fiftth.push(el[0].toString().concat(',' + el[1].toString()));
        })
        var rotatePoint = fiftth.join(" ");
        return rotatePoint;
    }

}


function Delete() {
    if (selectpolyid) {
        selectLineId = null;
        objects.polygon.forEach(el => {
            if (el.id == selectpolyid) {
                objects.polygon.splice(objects.polygon.indexOf(el), 1);
            }
        });
        selectpolyid = null;
        deskselected.remove();
    }


    if (selectLineId) {
        selectpolyid = null;
        objects.line.forEach(el => {
            if (el.id == selectLineId) {
                objects.line.splice(objects.polygon.indexOf(el), 1);
            }
        });
        condition.forEach(el => {
            if (el[4] == selectLineId) {
                condition.splice(condition.indexOf(el) , 1)
            }
        })
        selectLineId = null;
        lineselected.remove();
    }

    if (selectCircleId) {
        var circleSelect = document.getElementById(selectCircleId);
        circleSelect.remove();
    }
}

// GET CORDINATE OF OFFSET FORM TOP AND LEFT (USE FOR UPDATE CORDINATE WHEN USER SCROLL IN THE SITE )
function getcordinate() {
    rect = svg.getBoundingClientRect();
    rectTop = rect.top;
    rectLeft = rect.left;
}

//MAKE CHANGE TO THE BUTTON OF THE WALL OR LINE AFTER CLICK IT AND SET LIN VARIABLE TO TRUE FOR FUNCTIONALLITY
function lineSet() {
    lin = true;
    btnLine.style.transform = "scale(1.1)";
    btnLine.style.backgroundColor = "purple";
    btnLine.style.boxShadow = "3px 3px 4px black"
}


// ROTATE DESK SVG
function UP() {
    var selected = document.getElementById(selectpolyid);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            base = el.baserotate;
            el.rotate += 10;
            rotate = el.rotate;
        }
    });
    var newpoint = objects.rotatePolygon(base, rotate);
    selected.setAttribute("points", newpoint);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            el.point = newpoint;
        }
    });
}

// WHEN USER SELECT BUTTON THIS FUNCTIONS GET THE SELECTED ELEMENT (DESK) AND CALL SETWIDTHHEIGHT FUNCTION ON IT
function widthplus() {
    var selected = document.getElementById(selectpolyid);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            base = el.baserotate;
            rotate = el.rotate;
        }
    });

    newWidhpoint = setWidthHieght(base, 10, 0);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            el.baserotate = newWidhpoint;
        }
    });
    var newpoint = objects.rotatePolygon(newWidhpoint, rotate);
    selected.setAttribute("points", newpoint);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            el.point = newpoint;
        }
    });
}

function widthminus() {
    var selected = document.getElementById(selectpolyid);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            base = el.baserotate;
            rotate = el.rotate;
        }
    });

    newWidhpoint = setWidthHieght(base, -10, 0);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            el.baserotate = newWidhpoint;
        }
    });
    var newpoint = objects.rotatePolygon(newWidhpoint, rotate);
    selected.setAttribute("points", newpoint);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            el.point = newpoint;
        }
    });
}

function heightplus() {
    var selected = document.getElementById(selectpolyid);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            base = el.baserotate;
            rotate = el.rotate;
        }
    });

    newWidhpoint = setWidthHieght(base, 0, 10);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            el.baserotate = newWidhpoint;
        }
    });
    var newpoint = objects.rotatePolygon(newWidhpoint, rotate);
    selected.setAttribute("points", newpoint);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            el.point = newpoint;
        }
    });
}

function heightminus() {
    var selected = document.getElementById(selectpolyid);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            base = el.baserotate;
            rotate = el.rotate;
        }
    });

    newWidhpoint = setWidthHieght(base, 0, -10);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            el.baserotate = newWidhpoint;
        }
    });
    var newpoint = objects.rotatePolygon(newWidhpoint, rotate);
    selected.setAttribute("points", newpoint);
    objects.polygon.forEach(el => {
        if (el.id == selected.getAttribute('id')) {
            el.point = newpoint;
        }
    });
}



// CHANGE WIDTH AND HEIGHT OF THE DESK THAT CALL ON THE FUNCTION ABOVE
function setWidthHieght(point, addW, addH) {
    var splitBase;
    var newpoint = [];
    splitBase = point.split(' ').map(el => {
        return [Number(el.split(',')[0]), Number(el.split(',')[1])];
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
        newpoint.push(el[0].toString().concat(',' + el[1].toString()));
    });
    newpoint = newpoint.join(' ')
    return newpoint;
}




// PASS THE INFORMATION GLOBALLY WHEN CLICK TO DRAG DESK
function sampleGetinfo(e) {
    rectangle_desk = true;
    var desk_pos = sample.getBoundingClientRect();
    x = e.clientX - desk_pos.left;
    y = e.clientY - desk_pos.top;
    width = desk_pos.width;
    height = desk_pos.height;
}

function getinfofcirclechair(e) {
    circle_chair = true;
    var chair_pos = chair_sample.getBoundingClientRect();
    x = e.clientX - chair_pos.left;
    y = e.clientY - chair_pos.top;

}

// CREATE A HTML_CSS (RECTANGLE) DESK FOR DRAGING TO THE SVG
function create(ev) {
    if (max.value && min.value) {
        ev.preventDefault();
        sample.className = 'sample_desk';
        small.style.visibility = 'visible';
        maxValue = max.value;
        minValue = min.value;
        deskName = deskNameInput.value;
    }

}



// OBJECT THAT HOLD ARRAY OF OBJECTS AND METHOD FOR CREATING THEM
objects = new Objects();
if (oldcondition) {
    condition = oldcondition;
}

//  SET THE INFORMATION OF OBJECT(OLDOBJECT) BEFORE LOADING IN TO THE OBJECT
if (oldobjects) {
    oldobjects = JSON.parse(sessionStorage.getItem('objects'));
    
    // CREATE SVG ELEMENT THAT EXIST BEFOR RELOADING THE PAGE
    oldobjects.polygon.forEach(el => {
        objects.createPolygon(el.point, el.name, el.min, el.max, el.baserotate, el.rotate);

    })
    // objects.createLine (5 , 5 ,100 ,100)
    
    oldobjects.line.forEach(el => {
        objects.createLine(el.x1, el.y1, el.x2, el.y2);
    })

    oldobjects.circle.forEach(el => {
        objects.createCircle(el.cx, el.cy, el.r, el.fill);
    })

}

svg.addEventListener('mousedown', startDrag);
svg.addEventListener('mousemove', drag);
svg.addEventListener('mouseup', endDrag);
svg.addEventListener('mouseleave', endDrag2);

// forEdit(false , oldselectpolyid);
// lineForEdit(false , false);


// FOR DELETING DESK
function forEdit(thispermission = true , oldselectpolyid) {
    if (selectLineId) {
        lineselected = document.getElementById(selectLineId);
        lineselected.style.filter = "";
        lineselected.style.stroke = "black";
    }

    if (oldselectpolyid) {
    deskselected = document.getElementById(oldselectpolyid);
    deskselected.style.fill = "";
    deskselected.style.filter = "";
    }

    if (selectpolyid) {
    deskselected = document.getElementById(selectpolyid);
    deskselected.style.fill = "";
    deskselected.style.filter = "";

    }


    if (thispermission ) {
        selectpolyid = this.getAttribute('id') ;
        rotateCriteria = this.getAttribute('points');
    }
    deskselected = document.getElementById(selectpolyid);
    deskselected.style.fill = "#6e2503";
    deskselected.style.filter = "url(#f1)";
    selectLineId = null;
}

// FOR DELETING WALL 
function lineForEdit (thispermission = true , permissionforpolydefault = true) {

    if (permissionforpolydefault) {
        if (selectpolyid) {
            deskselected = document.getElementById(selectpolyid);
            deskselected.style.fill = "";
            deskselected.style.filter = "";
        
            }
    }

    if (oldselectLineId) {
        lineselected = document.getElementById(oldselectLineId);
        lineselected.style.filter = "";
        lineselected.style.stroke = "black";
    }
    if(selectLineId) {
        lineselected = document.getElementById(selectLineId);
        lineselected.style.filter = "";
        lineselected.style.stroke = "black";

    }

    if (thispermission) {
        selectLineId = this.getAttribute('id') ;
    }
    if (permissionforpolydefault ) {

        lineselected = document.getElementById(selectLineId);
    if (lineselected) {
        lineselected.style.stroke = 'green ';
    }
    selectpolyid = null;
    }
    
}

function circleforEdit (thispermission = true , permissionforpolydefault = true , permissionforlinedefault = true) {
    

}


// SVG DRAG FUNCTIONALLITY
// DRAG START
//  THIS FUNCTIONS ATTACH TO THE MOUSEDOWN , MOUSEMOVE,MOUSEUP AND MOUSELEAVE EVENT 
function startDrag(evt) {
    // DRAG POLYGON DESK !!!
    if (lineEditeId == 0) {
        if (evt.buttons == 1 && evt.target.classList[0] == ".draggable") {
            selectElement = evt.target;
            x = evt.clientX - rectLeft;
            y = evt.clientY - rectTop;
            oldPoint = selectElement.getAttribute("points");
            // DRAG CIRCLE CHAIR !!!
        } else if (evt.buttons == 1 && evt.target.classList[0] == ".circle_draggable") {
            circ = true;
            // CREATE LINE AS A WALL !!!
        } else if (evt.buttons == 1 && lin == true) {
            Drag = true;
            x = Math.round(evt.clientX - rectLeft);
            y = Math.round(evt.clientY - rectTop);
            switch (x % 7) {
                case 1:
                    x = x - 1;
                    break;
                case 2:
                    x = x - 2;
                    break
                case 3:
                    x = x - 3;
                    break;
                case 4:
                    x = x + 3;
                    break;
                case 5:
                    x = x + 2;
                    break;
                case 6:
                    x = x + 1;
                    break;
            }
            switch (y % 7) {
                case 1:
                    y = y - 1;
                    break;
                case 2:
                    y = y - 2;
                    break
                case 3:
                    y = y - 3;
                    break;
                case 4:
                    y = y + 3;
                    break;
                case 5:
                    y = y + 2;
                    break;
                case 6:
                    y = y + 1;
                    break;
            };
          
                objects.createLine(x, y, x, y);
          
            newx = x;
            newy = y;
    
        }
    }
}


// DRAG ITSELF
function drag(evt) {
    if (lineEditeId == 0 ) {
        if (selectElement) {
            selectElement.style.cursor = "grabbing";
            newx = evt.clientX - rectLeft;
            newy = evt.clientY - rectTop;
            addx = newx - x;
            addy = newy - y;
            objects.polygon.forEach(el => {
                if (el.id == selectElement.getAttribute('id')) {
                    el.baserotate;
                    calbase = addPiont(el.baserotate, addx, addy);
                    cal = true;
                }
            });
    
            newPoint = addPiont(oldPoint, addx, addy);
            selectElement.setAttribute("points", newPoint);
            objects.polygon.forEach(el => {
                if (el.id == selectElement.getAttribute('id')) {
                    el.point = newPoint;
                }
            });
        } else if (circ == true) {
            newx = evt.clientX - rectLeft;
            newy = evt.clientY - rectTop;
            evt.target.setAttribute("cx", newx);
            evt.target.setAttribute("cy", newy);
            objects.circle.forEach(el => {
                if (el.id == evt.target.getAttribute('id')) {
                    el.cx = newx;
                    el.cy = newy;
                }
            });
        } else if (Drag == true) {
            lineBuild = document.getElementById("line" + objects.lineid);
            lineBildy =true;
            newx = Math.floor(evt.clientX - rectLeft);
            newy = Math.floor(evt.clientY - rectTop);
    
            switch (newx % 7) {
                case 1:
                    newx = newx - 1;
                    break;
                case 2:
                    newx = newx - 2;
                    break
                case 3:
                    newx = newx - 3;
                    break;
                case 4:
                    newx = newx + 3;
                    break;
                case 5:
                    newx = newx + 2;
                    break;
                case 6:
                    newx = newx + 1;
                    break;
            }
            switch (newy % 7) {
                case 1:
                    newy = newy - 1;
                    break;
                case 2:
                    newy = newy - 2;
                    break
                case 3:
                    newy = newy - 3;
                    break;
                case 4:
                    newy = newy + 3;
                    break;
                case 5:
                    newy = newy + 2;
                    break;
                case 6:
                    newy = newy + 1;
                    break;
            };
            if (lineEditeId == 0) {
                lineBuild.setAttribute("x2", newx);
                lineBuild.setAttribute("y2", newy);
            }
        }
    }

}

// DRAG END
function endDrag(evt) {
    if (lineEditeId == 0) {
        if (cal == true) {
            objects.polygon.forEach(el => {
                if (el.id == selectElement.getAttribute('id')) {
                    el.baserotate;
                    el.baserotate = calbase;
                }
            });
            cal = false;
        }
        selectElement ? selectElement.style.cursor = "grab" :
            oldPoint = null;
        selectElement = null;
        if (lineBuild && lineBildy == true) {
            objects.line.forEach(el => {
                if (el.id == lineBuild.getAttribute('id')) {
                    el.x2 = newx;
                    el.y2 = newy;
                }
            });
        }
        lineBuild = document.getElementById("line" + objects.lineid);
        if (lineBildy) {
            if (x !== 0 && y !== 0 && newx !== 0 && newy !== 0 ) {
                if (Math.abs(x-newx) <10 && Math.abs(y - newy)<10) {
                    objects.line.pop();
                    if (lineEditeId == 0 ) {
                        lineBuild.remove();
                    }
                    objects.lineid = objects.lineid - 1;
                }else {
                    
                    if (lineEditeId == 0) {
                        var idofline = lineBuild.getAttribute('id');
                        condition.push([x , y , newx ,newy ,idofline])
                    }
                }
            }
        }
        x = 0;
        y = 0;
        newx = 0;
        newy = 0;
        lineBuild = false;
        circ = false;
        Drag = false;
        lineBildy = false;
    }
}

function endDrag2(evt) {
    if (lineEditeId == 0) {
        selectElement ? selectElement.style.cursor = "grab" :
        oldPoint = null;
    selectElement = null;
    circ = false;
    Drag = false;
    lin = false;
    btnLine.style.transform = "scale(1)";
    btnLine.style.backgroundColor = "";
    btnLine.style.boxShadow = "";
    }
}
// SVG DRAG FUNCTIONALLITY END






// FUNCTION THAT ADD POINT OF POLYGON ELEMENTS
function addPiont(piont, addx, addy) {
    let x = [];
    let y = [];
    let first = piont.split(" ");
    let second = first.map(el => el.split(","));
    second.forEach(el => {
        x.push(Number(el[0]));
        y.push(Number(el[1]));

    })
    x = x.map(el => el = el + addx).map(el => el.toString());
    y = y.map(el => el = el + addy).map(el => el.toString());
    var newpoint = [];
    for (let i = 0; i < x.length; i++) {
        newpoint.push(x[i].concat("," + y[i]))
    }
    newpoint = newpoint.join(" ");
    return newpoint;
}

// FUNCTION FOR CALCULATE CORDINATE OF POLYGON WITH REGARD TO POSITION OF CLICK
function calCordinate(x, y, svgX, svgY, width, height) {
    var xplus = width - x;
    var yplus = height - y;
    result = `${svgX - x},${svgY - y} ${svgX + xplus},${svgY - y} ${svgX + xplus},${svgY + yplus} ${svgX - x},${svgY + yplus}`;
    return result;
}



//  DRAG AND DROP DESK
function dragStart() {
    setTimeout(() => sample.className += ' invisable', 0)
}


function svgover(e) {
    e.preventDefault();

}

svg.ondragover = (e) => {
    svgX = e.clientX - rectLeft;
    svgY = e.clientY - rectTop;
}

function dragEndsvg(e) {
    // MAKE A DESK WHEN DRAG END
    if (rectangle_desk == true) {
        small.style.visibility = "";
        sample.ondragend = function (e) {
            P = calCordinate(x, y, svgX, svgY, width, height);
            objects.createPolygon(P, deskName, minValue, maxValue, P, 0);
            objects.polygon.forEach(el => {
                if (el.point == P) {
                    var element = document.getElementById(el.id);
                    if (selectpolyid) {
                        oldselectpolyid = selectpolyid;
                    }
                    selectpolyid = el.id;
                    forEdit(false , oldselectpolyid);
                    lineForEdit(false , false);

                }
            });

        }
        rectangle_desk = false;
    }

    if (circle_chair == true) {
        // MAKE A CIRCLE CHAIR WHEN DRAG END
        chair_sample.ondragend = function (e) {
            objects.createCircle(svgX, svgY, 15, "lightyellow");

        }


    }
}
//  DRAG AND DROP DESK END


// MULTIPLY MATRIX FUNCTION 
function matrixMultiply(matrixA, matrixB) {
    var error = 0;
    var first = 0;
    var array = [];
    matrixA.forEach(el => {
        if (el.length !== matrixA[0].length) {
            error = 1;

        }
    });

    if (error !== 0) {
        return error;

    } else if (matrixA.length !== matrixB.length) {
        error = 2;
        return error;

    } else {

        for (var i = 0; i < matrixA.length; i++) {
            for (var j = 0; j < matrixB.length; j++) {
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
    sessionStorage.removeItem('condition');
    if (newDesign == false ) {
    if (reset == false) {
        sessionStorage.setItem('objects', JSON.stringify(objects));
        sessionStorage.setItem('condition' , JSON.stringify(condition));
    }
    if (reset) {
        sessionStorage.clear();
    }
    }

}

var checkbtn = document.getElementById('check_objects');
checkbtn.onclick = () => {
    console.log(objects);
    console.log(condition);
    console.log(sessionStorage);
    condition.forEach (el => {
         var check = lineexplore(el);
        console.log(check);
    })

};

function lineexplore (condition) {
    var x1;
    var y1;
    var x2;
    var y2;
    if (condition [0] < condition [3]) {
        x1 = condition [0];
        y1 = -condition [1];
        x2 = condition [2];
        y2 = -condition [3];
    }else {
        x1 = condition [2];
        y1 = -condition [3];
        x2 = condition [0];
        y2 = -condition [1];

    }

    var slope = (y2 - y1) / (x2 - x1);
    return slope;


}


test = [217, 35, 525, 196, "line1"];

lineexplore (test)







