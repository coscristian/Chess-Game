

var array = new Array();
var matrix = new Array();
var pawns_Team_A = [];
var pawns_Team_B = {};
var deleted_elements_A = [];
var deleted_elements_B = [];
var firstMovement = true;
var color;


function create_element(team, number_of_mov, color, element_name){

    globalThis.new_movement = document.createElement("p"); 
    new_movement.innerHTML = element_name;
    new_movement.setAttribute("id",team + " " + number_of_mov);
    
    new_movement.setAttribute("style", "text-align:center; color:" + color);

}

function delete_element(row,column){

    if (row >= 0 && row <=7 && column >= 0 && column <=7){

        var element = matrix[row][column];
        element.innerText = "";

    }

}

function paintBoard(row,column){

    if (row % 2 != 0 && column % 2 == 0 || row % 2 == 0 && column % 2 != 0){
        color = "#7d945d";  //Green  rgb(125, 148, 93)
    }else{
        color = "#eeeed5"; //Gray  rgb (238, 238, 213)
    }

}

function move_pawn(row, column, team, total_of_mov, number_of_mov){

    var has_deleted_an_element = false;

    team = team.item(0).id; //Get the id of the element (Team A or B)

    if (team == "A"){   //Color on the new movement
            var pawn_color = "black";
        }else{
            var pawn_color = "red";
        }

    number_of_mov+=1;

    create_element(team, number_of_mov, pawn_color, "P");

    //If there is any element where the pawn has moved, delete it
    // delete_element(row,column);

    if ( matrix[row][column].lastChild != null){

        if (matrix[row][column].lastChild.id.charAt(0) == "A"){

            deleted_elements_A.push(matrix[row][column].lastChild.outerText);

        }else{
            deleted_elements_B.push(matrix[row][column].lastChild.outerText);

        }

        delete_element(row,column);

        has_deleted_an_element = true;

        console.log("He eliminado el elemento en la posición: " + row + "," + column);
        console.log("Elementos eliminados de A: "+ deleted_elements_A);
        console.log("Elementos eliminados de B: "+ deleted_elements_B);

    }

    //Move the piece
    matrix[row][column].appendChild(new_movement);
    
    //Posible modificación para evitar pintar de nuevo todos los cuadros
    // for (var i = 1; i <= total_of_mov; i++){
    //     paintBoard((row + 1), (column + 1));
    //     matrix[row][column].setAttribute("style", "background-color:" + color + "; width: 70px; height: 70px;");
    //     row+=1;
    // }
    
    for (var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){

        paintBoard((i+1) , (j + 1)); //Select the correct color
        matrix[i][j].setAttribute("style", "background-color:" + color + "; width: 70px; height: 70px;"); // Paint the square
        }
    }
    console.log("El equipo es: " , team);

    if (team == "A"){

        if (has_deleted_an_element){

            delete_element(row-1,column+1);
            delete_element(row-1,column-1);
            // delete_element((row-total_of_mov), column+1);

            has_deleted_an_element = false;

        }else{
            delete_element((row-total_of_mov), column);
        }

        matrix[row][column].setAttribute("onclick","movement_possibilities(" + row + "," + column + ")");  

    }else{

        if (has_deleted_an_element){

            delete_element(row+1,column+1);
            delete_element(row+1,column-1);
            // delete_element((row+total_of_mov),column+1);
            has_deleted_an_element = false;

        }else{
            delete_element((row+total_of_mov),column);

        }
        matrix[row][column].setAttribute("onclick","movement_possibilities(" + row + "," + column + ")");  
    }

    console.log("Cantidad de movimientos: " + total_of_mov);
    console.log("La ficha fue movida a la fila " + (row+1));
    console.log("La ficha fue movida a la columna: " + (column+1));
    
}


function can_move_to_front(row,column,pawn_team, number_of_possible_mov){

    // if (pawn_team == "A" && row == 7 || pawn_team == "B" && row == 0){
    //     return false;
    // }

    if (pawn_team == "A"){

        if (matrix[row+number_of_possible_mov][column].lastChild && null || matrix[row+1][column].lastChild == null){
            return true;
        }else{
            return false;
        }
    }else{

        if ( matrix[row-number_of_possible_mov][column].lastChild == null && matrix[row-1][column].lastChild == null){
            return true;
        }else{
            return false;
        }

    }
}

function can_move_in_diagonal(row,column,pawn_team){

    globalThis.side = "";
    var can_only_move_to_one_side ="";

    if (column == 0 ){
        can_only_move_to_one_side = "right";
    }else if (column == 7){
        can_only_move_to_one_side = "left";
    }

    if (pawn_team == "A"){

        if ( can_only_move_to_one_side == "right"){

            if (matrix[row+1][column+1].lastChild != null && matrix[row+1][column+1].lastChild.id.charAt(0) != "A"){
                side = "right";
                return true;
            }else{
                return false;
            }

        }else if (can_only_move_to_one_side == "left"){
            
            if (matrix[row+1][column-1].lastChild != null && matrix[row+1][column-1].lastChild.id.charAt(0) != "A"){
                side = "left";
                return true;
            }else{
                return false;
            }

        }else{
            if (matrix[row+1][column-1].lastChild != null && matrix[row+1][column-1].lastChild.id.charAt(0) != "A"){
                side = "left";
                return true;
            }else if (matrix[row+1][column+1].lastChild != null && matrix[row+1][column+1].lastChild.id.charAt(0) != "A"){
                side = "right";
                return true;
            }else{
                return false;
            }
        }
    }
    else if (can_only_move_to_one_side == "right"){

        if (matrix[row-1][column+1].lastChild != null && matrix[row-1][column+1].lastChild.id.charAt(0) != "B"){
            side = "right";
            return true;
        }else{
            return false;
        }

    }else if (can_only_move_to_one_side == "left"){

        if (matrix[row-1][column-1].lastChild != null && matrix[row-1][column-1].lastChild.id.charAt(0) != "B"){
            side = "left";
            return true;
        }else{
            return false;
        }
    }else{
        if (matrix[row-1][column+1].lastChild != null && matrix[row-1][column+1].lastChild.id.charAt(0) != "B"){
            side = "right";
            return true;
        }else{
            if (matrix[row-1][column-1].lastChild != null && matrix[row-1][column-1].lastChild.id.charAt(0) != "B"){
                side = "left";
                return true;
            }else{
                return false;
            }
        }
    }
}

function show_movement_posibilites(row, column, number_of_possible_mov, pawn_team, number_of_mov){

    if (can_move_in_diagonal(row, column, pawn_team)) {

        if (side == "left") {

            if (pawn_team == "A") {

                var amount_to_move_row = row + 1;
                var amount_to_move_column = column - 1;

            } else {
                var amount_to_move_row = row - 1;
                var amount_to_move_column = column - 1;
            }

        } else if (pawn_team == "A") {

            var amount_to_move_row = row + 1;
            var amount_to_move_column = column + 1;

        } else {
            var amount_to_move_row = row - 1;
            var amount_to_move_column = column + 1;
        }


        var possibilities = matrix[amount_to_move_row][amount_to_move_column];
        possibilities.setAttribute("style", "border: 3px solid red; background-color:yellow; width: 70px; height: 70px; cursor:pointer;");
        possibilities.classList.add("intermitent");
        possibilities.setAttribute("onclick", "move_pawn(" + amount_to_move_row + "," + amount_to_move_column + "," + pawn_team + "," + i + "," + number_of_mov + ")");

    }

    if (can_move_to_front(row,column, pawn_team, number_of_possible_mov)){

        if (pawn_team == "A"){

            for (i = 1 ; i <= number_of_possible_mov; i++){  
                        
                row+=1;
                var possibilities = matrix[row][column];
                possibilities.setAttribute("style","border: 3px solid blue; background-color:yellow; width: 70px; height: 70px; cursor:pointer;");
                possibilities.setAttribute("onclick","move_pawn(" + row + "," + column + "," + pawn_team + "," + i + "," + number_of_mov + ")");
                
                // var possibilities = matrix[row][column];
                // possibilities.setAttribute("style","background-color:blue; width: 70px; height: 70px; cursor:pointer;");
                // possibilities.setAttribute("onclick","move_pawn(" + row + "," + column + "," + pawn_team + "," + i + "," + number_of_mov + ")");
                
            }
        
        }else{

            for (i = 1 ; i <= number_of_possible_mov; i++){  
                        
                row-=1;
                var possibilities = matrix[row][column];
                possibilities.setAttribute("style","border: 3px solid blue; background-color:yellow; width: 70px; height: 70px; cursor:pointer;");
                possibilities.setAttribute("onclick","move_pawn(" + row + "," + column + "," + pawn_team + "," + i + "," + number_of_mov + ")");

            }
        }
    }

}

function pawn_movement_possibilities(row,column){

    //Get the pawn(the tag <p>) (to know if it is of team A or B)
    var pawn_team = matrix[row][column].lastChild.id.charAt(0); 
    var number_of_mov = matrix[row][column].lastChild.id.charAt(2);
    
    number_of_mov = parseInt(number_of_mov);

    if (number_of_mov == 0){

        if (can_move_to_front(row,column, pawn_team, 2)){
            var number_of_possible_mov = 2;

        }else{
            var number_of_possible_mov = 1;

        }
        
    }else{
        var number_of_possible_mov = 1;
    }

    console.log("Revisando el equipo tenemos: " + pawn_team);

    if ( can_move_to_front(row,column, pawn_team, number_of_possible_mov) || can_move_in_diagonal(row,column,pawn_team)){

        show_movement_posibilites(row, column, number_of_possible_mov, pawn_team, number_of_mov);

    }
}



function move_tower(row,column, team, movements_to_do){

    console.log("team " + team);

    if (team == "A"){   //Color on the new movement
        var tower_color = "black";
    }else{
        var tower_color = "red";
    }

    var new_movement_tower = document.createElement("p"); 
    new_movement_tower.innerHTML = "Tower";
    new_movement_tower.setAttribute("id",team + " " + movements_to_do);
    
    new_movement.setAttribute("style", "text-align:center; color:" + tower_color);

    // create_element(team, movements_to_do, tower_color, "Tower");
    matrix[row][column].appendChild(new_movement_tower);

    for (var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){

            paintBoard((i+1) , (j + 1)); //Select the correct color
            matrix[i][j].setAttribute("style", "background-color:" + color + "; width: 70px; height: 70px;"); // Paint the square
        }
    }
    


    



}

function can_tower_move_to_front(row,column,tower_team){

    globalThis.can_delete_element = false;
    globalThis.position_row = 0;
    globalThis.position_column = 0;

    globalThis.amount_of_squares_to_move = 0;

    if (tower_team == "A"){

        for (let i = row; i < 8; i++ ){

            if (matrix[i+1][column].lastChild == null ){

                amount_of_squares_to_move+=1;

            }else if (matrix[i+1][column].lastChild.id.charAt(0) == "B"){

                can_delete_element = true;
                globalThis.position_row = i+1;
                globalThis.position_column = column;
                break;
            }else{
                break;
            }
        }
        
    }else{
        for (let i = row; i > 0 ; i-- ){

            if (matrix[i-1][column].lastChild == null ){

                amount_of_squares_to_move+=1;

            }else if (matrix[i-1][column].lastChild.id.charAt(0) == "A"){

                can_delete_element = true;
                globalThis.position_row = i-1;
                globalThis.position_column = column;
                break;
            }else{
                break;
            }
        }
    }

    if (amount_of_squares_to_move != 0){
            return true;

        }else{
            return false;
        }

}
// paint_tower_possibilities(row, column, 1, tower_team);

function paint_tower_possibilities(row, column, movement_in_row, tower_team){

    var counter = 0;
    while (counter != amount_of_squares_to_move){

        row+=movement_in_row;
        var possibilities_tower = matrix[row][column];
        possibilities_tower.setAttribute("style","border: 3px solid blue; background-color:yellow; width: 70px; height: 70px; cursor:pointer;");
        possibilities_tower.setAttribute("onclick","move_tower(" + row + "," + column + "," + tower_team + "," + counter + ")");
        counter+=1;
        console.log(counter);

    }

    if (can_delete_element){
        var possibilities_tower = matrix[position_row][position_column];
        possibilities_tower.setAttribute("style","border: 3px solid red; background-color:yellow; width: 70px; height: 70px; cursor:pointer;");
        possibilities_tower.classList.add("intermitent");
        possibilities_tower.setAttribute("onclick","move_tower(" + row + "," + column + "," + tower_team + "," + counter + ")");
    }
}

function tower_movement_possibilities(row,column){

    globalThis.tower_team = matrix[row][column].lastChild.id.charAt(0);
    console.log("La torre seleccionada es del equipo : " + tower_team);

    if ( can_tower_move_to_front(row,column,tower_team) && tower_team == "A"){

        paint_tower_possibilities(row, column, 1, tower_team);

    }else if ( can_tower_move_to_front(row,column,tower_team) && tower_team == "B"){

        paint_tower_possibilities(row, column, -1, tower_team);

    }

}

function movement_possibilities(row, column){

    var selected_item = matrix[row][column].innerText; 
    
    console.log(matrix);

    console.log("La ficha seleccionada fue: " , selected_item);
    console.log("Has dado clic en la Fila: " + (row+1) + ", Columna: " + (column+1));
    console.log(selected_item);

    //Create the blue possibilities
    
    switch(selected_item){
        case "P": pawn_movement_possibilities(row,column); break;
        case "Tower": tower_movement_possibilities(row,column); break;
    }

}

function addFigure(square, rows, columns, figureName, position_column_A, position_column_B, double_position, team){  //Position_column is the column of the figure

    if (team == "A"){

        color = "black";

    }else{
        color = "red";
    }

    if (double_position){

        if (rows == 1 && columns == position_column_A || rows == 1 && columns == position_column_B || rows == 8 && columns == position_column_A || rows == 8 && columns == position_column_B){

            var fig = document.createElement("p");
            fig.innerHTML = figureName;
            fig.setAttribute("style","text-align:center; color:" + color);
            fig.setAttribute("id",team);
            square.appendChild(fig);
        }

    }else if (rows == 1 && columns == position_column_A || rows == 8 && columns == position_column_A){
            var fig = document.createElement("p");
            fig.innerHTML = figureName;
            fig.setAttribute("style","text-align:center; color:" + color);
            fig.setAttribute("id",team);
            square.appendChild(fig);
    }

}

function addPawn(square, rows, team){

    if ( rows == 2 || rows == 7){

        if (team == "A"){
            var color = "black";
        }else{
            var color = "red";
        }

        var pawn = document.createElement("p");  //Crear un peón
        pawn.innerHTML = "P";    //Create the text
        pawn.setAttribute("style", "text-align: center; color:" + color + ";");
        var mov = 0;
        pawn.setAttribute("id",team + " " + mov);
        square.appendChild(pawn);   // Add the pawn (peón) to the square
        
        // console.log(pawn.innerHTML);
        pawns_Team_A[pawn] = true;
    }

}

function createBoard(){

    var cont = 1;

    for ( var rows = 1; rows <= 8; rows++){

        array = [];

        var board = document.getElementById('board');  

        var fila = document.createElement("div");  //Create every row
        fila.classList.add("row");

        board.appendChild(fila);                 //Add every row to the board

        if ( rows > 2){
            var team = "B";
        }else{
            var team = "A";
        }

        for (var columns = 1; columns <= 8; columns++){

            paintBoard(rows, columns);
            var square = document.createElement('div');

            square.setAttribute("id", cont);
            square.setAttribute("style", "background-color:" + color + "; width: 70px; height: 70px;");

            //Call the function to show the movement possibilities
            square.setAttribute("onclick","movement_possibilities(" + (rows - 1) + "," + (columns - 1) + ")");  

            // square.addEventListener("click",movement_possibilities(rows,columns));
            square.classList.add("col-8");

            fila.appendChild(square);

            addPawn(square, rows, team, columns);  //Add the pawn(peon)

            addFigure(square,rows,columns,"Tower",1,8, true, team);
            addFigure(square,rows,columns, "Horse",2,7, true, team);
            addFigure(square,rows,columns, "Bishop",3,6, true, team);
            addFigure(square,rows,columns, "Queen",4,5, false, team);
            addFigure(square,rows,columns, "King",5,4, false, team);
            cont+=1;

            array.push(square);
        
        }

        matrix.push(array);
    }

    // for(clave in pawns_Team_A){
    //     console.log(pawns_Team_A[clave]);
    // }
}

createBoard();
console.log(pawns_Team_A);