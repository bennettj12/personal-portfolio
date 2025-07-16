# Chess Engine & AI

---

## Project Overview

One of my C.S. courses near the end of my program was a larger group project in which we needed to collaborate on a project of our choice. Together, despite the fact that none of us were all that into chess, we decided it might be a fun and interesting challenge to build a chess app.

We had a general goal which would allow for some division of labor, the app would have a React/web-based frontend and the engine itself would be written in Java. To connect these parts, we decided to use Spring to build a REST API.

As we were a team of three, this made for a nice setup where one person could work on the frontend, one on the Spring API, and another on the Java engine. Of course, we helped each other and worked across the project when we could.

I took on the task of writing the engine, and since I had time left in the semester, I also created the AI agent.

## Chess Engine

Before getting to work on building a chess engine, we needed to get on the same page about architecture and structure of the project. So, we began building some diagrams and working together to define the components and nature of the project.

This came in the form of primarily two things:

1. Specific project requirements document: To the best of our abilities, we defined the project in terms of its purpose & what features should be present. We tried to categorize our project definitions by degree of importance, from must-haves to optional but nice-to-haves.
2. From our requirements, we built some diagrams, one for the engine's general structure, and another for objects & their relationships.

![Entity Relationships](/mdimages/classes.png)
![Class Diagram](/mdimages/relationships.png)

The main challenges in this phase were simply deciding on how to store and structure chess game data in memory. 

``` java
enum ChessPiece {
  NONE 0,
  PAWN 1,
  ROOK 2,
  KNIGHT 3,
  BISHOP 4,
  QUEEN 5,
  KING 6
}

// x coord
enum File {
  A 0,
  B 1,
  C 2,
  D 3,
  E 4,
  F 5,
  G 6,
  H 7
}

// y coord (stride)
enum Rank {
  _1 0,
  _2 1,
  _3 2,
  _4 3,
  _5 4,
  _6 5,
  _7 6,
  _8 7
}

enum PlayerColor {
  WHITE 1,
  BLACK -1
}

interface Position {
  File file;
  Rank rank;
}

interface MoveIntent {
  ChessPiece chessPiece;
  Position from;
  Position to;
}

// high level for summary views
interface GameInfo {
  int gameId;
  int owner; // playerId
  int[2] players; // [playerId, playerId], turn order is determined by index
  long moveCount; // current player can be determined by players[moveCount % 2]
  GameCompletionState completed;
  int winner; // playerId
}

// how a Game is represented in persistence 
interface GameRecord extends GameInfo {
  int[64] board;
}

interface GameState extends GameInfo {
  int inCheck; // playerId, null if no one in check
}

// runtime object
interface Game {
  int gameId;
  Player[2] players; // [Player1, Player2], turn order is determined by index. index 0 is white, index 1 is black
  long moveCount; // determine current player by players[moveCount % 2]
  ChessPiece[64] board;
  boolean complete;
  Player winner;

  // validate move,
  // update game state, persist
  // increment moveCount
  // notify players of new game state
  boolean move(Player player, MoveIntent intent);
  GameState getGameState();
}

interface MoveValidator {
  boolean validateMove(
    MoveIntent intent,
    ChessPiece[64] board,
    PlayerColor playerColor
  );
}
```

In the above definitions, we also showed some of the intended relationships between different interfaces, with the ultimate goal of having a `Game` object which contains all necessary information about a given chess match, including move history, etc...
Some things changed between these definitions and the final product, for example we later decided to simplify boards to arrays of integers rather than arrays of `ChessPiece` objects.

### Move Validator

With our relationships defined and our definition of a chess match defined, the bulk of the work of actually making a game happen comes from a simple process:
1. Current player attempts a move, this creates a `MoveIntent`.
2. The `MoveIntent` is given to the `MoveValidator`
3. If the move is determined to be valid, the `Game` object is updated to the next state.

As a part of the project, the move validator is doing the bulk of the work to making chess work as a game. It has to essentially have all rules of chess be at some level encoded into it. In most cases this comes in the form of looking at the piece the user wants to move and checking all possible locations that piece could move to, removing obstructed locations & then comparing that list with the user's intended move.
It gets a bit more complicated in some cases, such as en passant moves or castling, a bit more of the game state needs to be analyzed to determine if these are valid moves.
One example of a more complicated move validation:

``` java
// black king side castle
if(x == 4 && y == 7 && board.getPiece(new Position(6,7)) == 0 && board.getPiece(new Position(5,7)) == 0){
boolean legalMoveFlag = true;
for(MoveIntent move : moveRecord){
    // if the king or the rook has ever moved, cannot castle
    if(move.from.equals(new Position(7, 7))  || move.from.equals(new Position(4, 7))) {
        legalMoveFlag = false;
    }
}
// cannot castle when a king has to pass thru threatened square, or is in check.
if(positionUnderThreat(new Position(4, 7), -1, board) || positionUnderThreat(new Position(5, 7), -1, board)) {
    legalMoveFlag = false;
}
if(legalMoveFlag)
    locationsToCheck.add(new Position(x + 2, y));
}
```

As all rules of chess need to be covered in this Class, `MoveValidator` ended up being a very lengthy file, and the bulk of my work that semester was on it.

## AI Agent

---

The same logic used in our `MoveValidator` helps us greatly as we can reuse some of the same logic in validation to generate a list of potential moves. And with a simple list of all legal moves, we now have the "simple" task of choosing which one to use.

The general approach to building a chess AI, at least at the very basic level, we really only need to attempt to answer one question:

1. Given the state of the game, who is winning, and by how much?

### So, who is winning?

A very simple answer to this question can be made, for starters. We can assign an arbitrary value to each piece:

>Pawn:   100
>Knight:   320
>Bishop:   330
>Rook:   500
>Queen:   900
>King:   999999


Then, we add up the values for each piece on each side, and whoever has the larger number can be considered to be 'winning'. 
The king is set to infinity, or an arbitrarily large amount since losing the king is losing the game.

If we can determine who is winning, we can then use minimax to build a tree of potential future moves & decide which moves result in the highest score.
Minimax works on the assumption that the other player will also make the best given move available to them.

So in other words:

1. We look at the game state for all available moves starting from the current position, and we use our sum of piece values to determine how 'winning' or 'losing' each position is.
2. From these game states, we can branch and look at further future moves, we can search as deeply as we want, but we will quickly create a massive number of potential game states.
	1. Fortunately, even with a pretty shallow tree of game states, the result is still a somewhat competent AI.
	2. Additionally, since we assume the opposing player is seeking to minimize our score, and we maximize, we can at times know that the opponent would never take a given path, so we can stop generating board states that come from that position. This is a simple explanation of Alpha Beta pruning.

### Improving our game state analysis

One final improvement I used to improve the AI was to implement tables of positional weights. Essentially, this has the effect of encouraging the board evaluation towards having certain pieces in certain positions. 
These tables are determined on a piece-by-piece basis, and are arbitrarily defined. 
Here are some examples, first one for pawns, we can see that center pawns are given a negative weight, and centrally located pawns a positive weight. This should have the effect of encouraging central pawns to be moved to the center of the board, which is generally a decent thing to do in chess.

``` java
// pawn square table
{
	0,  0,  0,  0,  0,  0,  0,  0,
	50, 50, 50, 50, 50, 50, 50, 50,
	10, 10, 20, 30, 30, 20, 10, 10,
	5,  5, 10, 25, 25, 10,  5,  5,
	0,  0,  0, 20, 20,  0,  0,  0,
	5, -5,-10,  0,  0,-10, -5,  5,
	5, 10, 10,-20,-20, 10, 10,  5,
	0,  0,  0,  0,  0,  0,  0,  0
},
```

Another example is the table for knights:
``` java
{
	-50,-40,-30,-30,-30,-30,-40,-50,
	-40,-20,  0,  0,  0,  0,-20,-40,
	-30,  0, 10, 15, 15, 10,  0,-30,
	-30,  5, 15, 20, 20, 15,  5,-30,
	-30,  0, 15, 20, 20, 15,  0,-30,
	-30,  5, 10, 15, 15, 10,  5,-30,
	-40,-20,  0,  5,  5,  0,-20,-40,
	-50,-40,-30,-30,-30,-30,-40,-50 
},
```
This table is build to discourage knights from landing on the edges of the board, as it tends to be a worse position.
I used the premade tables found on this page for my board evaluation function: 
https://www.chessprogramming.org/Simplified_Evaluation_Function

## In Conclusion

Our chess project was overall very successful, and I found it to be a great experience working together with other devs on a project like this.
The project did a few more things beyond what I've gone over here, such as PGN imports and exports (chess notation system) & everything regarding the React frontend & Spring API. I worked a bit on all of these elements of the project, but I primarily stuck to the engine itself, so I kept my explanation to that.