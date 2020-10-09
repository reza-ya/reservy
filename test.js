




// CHECK WHICH ELEMENT SELECTED AND CHANGE STYLE WITH SETINTERVAL
// function checkSelectItem() {
    // if (selectpolyid) {
    //     if (deskselected) {
    //         deskselected.style.fill = "";
    //         deskselected.style.filter = "";
    //     }
    //     deskselected = document.getElementById(selectpolyid);
    //     deskselected.style.fill = "#6e2503";
    //     deskselected.style.filter = "url(#f1)";
    // }

    // if (selectLineId) {
    //     if (lineselected) {
    //         lineselected.style.filter = "";
    //         lineselected.style.stroke = "black";
    //     }
    //     lineselected = document.getElementById(selectLineId);
    //     lineselected.style.filter = "url(#f2)";
    //     lineselected.style.stroke = 'green '
    // }

    
// }
// setInterval(checkSelectItem, 10);




// FUNCTIONALLITY FOR CHECK FOR MOUSEOVER SVG AND EDIT LINE WHEN USER CLICK NEAR THE ENDS OF THE LINE


// function lineEdite (e) {
//     svg.style.cursor = 'grabing';
//     ifWork = false;
//     svg.addEventListener('mousemove' , svgLineEdit);
//     svgLineDragPermission = true;
//     var lineEdite = document.getElementById(lineEditeId);
//     var drag = true;
//     function svgLineEdit (e)  {
//         if (drag) {
//             if (x1) {
//             // newx = e.clientX - rectLeft;
//             // newy = e.clientY - rectTop;
//             newx = Math.round(e.clientX - rectLeft);
//             newy = Math.round(e.clientY - rectTop);
//             switch (newx % 7) {
//                 case 1:
//                     newx = newx - 1;
//                     break;
//                 case 2:
//                     newx = newx - 2;
//                     break
//                 case 3:
//                     newx = newx - 3;
//                     break;
//                 case 4:
//                     newx = newx + 3;
//                     break;
//                 case 5:
//                     newx = newx + 2;
//                     break;
//                 case 6:
//                     newx = newx + 1;
//                     break;
//             }
//             switch (newy % 7) {
//                 case 1:
//                     newy = newy - 1;
//                     break;
//                 case 2:
//                     newy = newy - 2;
//                     break
//                 case 3:
//                     newy = newy - 3;
//                     break;
//                 case 4:
//                     newy = newy + 3;
//                     break;
//                 case 5:
//                     newy = newy + 2;
//                     break;
//                 case 6:
//                     newy = newy + 1;
//                     break;
//             };
            
//             lineEdite.setAttribute('x1' ,newx );
//             lineEdite.setAttribute('y1' ,newy );
//             condition[Icondition].splice(0, 1 , newx);
//             condition[Icondition].splice(1 , 1 , newy);
//             objects.line.forEach(el => {
//                 if (el.id == lineEditeId) {
//                     el.x1 = newx;
//                     el.y1 = newy;
//                 }
//             });
            

//             }
//             if (x2) {
//                 // newx = e.clientX - rectLeft;
//                 // newy = e.clientY - rectTop;
//                 newx = Math.round(e.clientX - rectLeft);
//                 newy = Math.round(e.clientY - rectTop);
//             switch (newx % 7) {
//                 case 1:
//                     newx = newx - 1;
//                     break;
//                 case 2:
//                     newx = newx - 2;
//                     break
//                 case 3:
//                     newx = newx - 3;
//                     break;
//                 case 4:
//                     newx = newx + 3;
//                     break;
//                 case 5:
//                     newx = newx + 2;
//                     break;
//                 case 6:
//                     newx = newx + 1;
//                     break;
//             }
//             switch (newy % 7) {
//                 case 1:
//                     newy = newy - 1;
//                     break;
//                 case 2:
//                     newy = newy - 2;
//                     break
//                 case 3:
//                     newy = newy - 3;
//                     break;
//                 case 4:
//                     newy = newy + 3;
//                     break;
//                 case 5:
//                     newy = newy + 2;
//                     break;
//                 case 6:
//                     newy = newy + 1;
//                     break;
//             };
//                 lineEdite.setAttribute('x2' ,newx );
//                 lineEdite.setAttribute('y2' ,newy );
//                 condition[Icondition].splice(2 , 1 , newx);
//                 condition[Icondition].splice(3 , 1 , newy);

//                 objects.line.forEach(el => {
//                     if (el.id == lineEditeId) {
//                         el.x2 = newx;
//                         el.y2 = newy;
//                     }
//                 });
//             }
//         }

       

//     }

//     svg.onmouseup = (e) => {
//         drag = false;
//         x1 = false;     
//         x2 = false;
//         svg.removeEventListener('mousemove' , svgLineEdit);
//         svgLineDragPermission = false;
//         lineEditeId = 0;
//         ifWork = true;
//         svg.style.cursor = '';
//     }

// }




// svg.onmousemove = (e) => {
//     svgX = e.clientX - rectLeft;
//     svgY = e.clientY - rectTop;
    
//     if (ifWork) {
//         for (i = 0; i<condition.length; i++) {
//             var m = Math.abs(condition[i][3] - condition[i][1])/Math.abs(condition[i][2] - condition[i][0]);
//             if (((svgX -condition[i][0]) )*((svgX -condition[i][0])) + (svgY - condition[i][1])*(svgY - condition[i][1]) < 20) {
                
//                 Icondition = i;
//                 lineEditeId = condition[i][4];
//                 x1 = true;
//                 x2 =false;
//                 svg.addEventListener('mousedown' , lineEdite);
//                 svg.style.cursor = 'grab';
//                 break
                    
                
//             }else if (((svgX -condition[i][2]) )*((svgX -condition[i][2]) ) + (svgY - condition[i][3])*(svgY - condition[i][3]) < 20) {
//                 svg.style.cursor = 'grab';
//                 Icondition = i;
//                 x1 = false;
//                 x2 = true;
//                 lineEditeId = condition[i][4];
//                 svg.addEventListener('mousedown' , lineEdite);
//                 break
    
    
//             }else {
//                 svg.style.cursor = '';
//                 x1 = false;
//                 x2 = false;
//             }
//             if (x1 == false && x2 == false) {
//                 lineEditeId = 0;
//                 svg.style.cursor = '';
//                 x1 = false;
//                 x2 = false;
//                 svgLineDragPermission = false;
//             }
            
//         } 
        
//     }
    
    
// }
