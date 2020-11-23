class Play{
    constructor(){
        this.series=[];
        this.states=[];
        this.attempsCounter=0;
        this.moves=[];
        this.board = undefined;
        this.Pentominos=[];
        
    }
    /**
     * @desc: Board can be loaded from previous game sate, which is maybe completed or half done
     *        or from json files, or a new board. Whatever it is, it will create a new board with
     *        configuration for above conditions. If it is not new, then replay() will fill the board 
     *        with pieces, that was selected before.     
     * @param: 
     *      inputBoardConifg: [json object for a board config ]
     *      inputType: [database/file/userChoices/others]
     *      
     * @return:
     *      board
     */
    loadBoard(){
        this.board;
    } 
    /* loadBoardFromFile() */

    /**
     * @desc: Revert to previous state for every played moves. It will not change the game state, until 
     *        User does not decide to place a pentominos in previous configuration. We need to keep track 
     *        the moves also. Let say, 
     *                                    PlayedMoves=[F,Y,X,T,L,W] (----series-06----)
     *        
     *        Now after reverting 3 steps,  
     *                                    PlayedMoves = [F,Y,X],    (----series-03)
     *        In this configuration, user decide to place a new pentomnio or reverting one, which does not 
     *        match with previous series, then our current series will be invalidated, and start with new 
     *        series. Previous we had, [F,Y,X], now user place W, then new series will be [F,Y,X,W], which 
     *        change the move states. 
     *        If user does not put anything, just undoing, then series will not changed.
     * 
     * @param:NA
     * @return:
     *      Series;      
     * 
     */
    undo();

    /**
     * @desc: User wants to replay, his every moves in a row, then this function will be executed. 
     * @param: 
     *        elapseTime:
     *        startPosition:
     * @return:
     *      NA       
     */
    replay();

    /**
     * @desc: After replaying, if user choose to pause and decide the change of game state already played, then
     *        function will be called to pause. The series it is already executed until, pause will be saved, if
     *        user choose any place any other pentominos, and it causes changes in existing configuration, then 
     *        we will have new series, which should return.
     * @param:
     *      NA
     * @return:
     *      series
     */
    pauseReplay();

    /**
     * @desc: This function solve the game in auto solver mode without user interaction.
     * @param:
     *      board
     *      algorithm
     *      pentominos
     */
    autoplay();
    

}