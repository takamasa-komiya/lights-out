function initialize(){
    //元に存在したらid="game"の要素を消して再生
    let gameNode = document.getElementById("game");
    const mainNode = document.getElementById("main")
    if(gameNode){
        mainNode.removeChild(gameNode)
    }
    gameNode = document.createElement("div");
    gameNode.id = "game";
    mainNode.appendChild(gameNode);

    class LightButton {
        constructor(x,y) {
            this.x = x;
            this.y = y;
            this.state = 0;
            this.dom = createDiv(x,y);
        } 
        
        change(){
            this.state = this.state = (this.state)? 0 : 1;
            // this.dom.className = (this.dom.className === "lightbutton off")? ("lightbutton on"): ("lightbutton off");
            this.dom.className = (this.state)? ("lightbutton on"): ("lightbutton off");
        }
        
    }

    //状態フィールド
    let lbObjField = [];

    //手数
    let hand = 0;
    const handNode = document.getElementById("hand");
    handNode.value =  hand;
    handNode.innerText = hand + "手";

    //解答
    const answer = [];

    //ボタンの押下状況
    let userTouches = [];

    //ボタン数
    let size = document.getElementById("size").value;
    gameNode.style.width = (size * 110 + 20) + "px";
    gameNode.style.height = (size * 110 + 20) + "px";
    document.getElementById("gamemenu").style.width = (size * 110 + 20) + "px";

    //ボックス生成
    for(let i = 0; i < size; i++){
        lbObjField.push([]);
        for(let j = 0; j < size; j++){
            let lbObj = new LightButton(i,j);
            lbObjField[i].push(lbObj);   
        }
    }

    //初期配置
    for(let i = 0; i < size; i++){
        userTouches.push([]);
        answer.push([]);
        for(let j = 0; j < size; j++){
            userTouches[i].push(0);
            const rand = Math.random();
            if(rand < 0.5){
                aroundChange(i,j);  
                answer[i].push(1);
            }else{
                answer[i].push(0);
            }
        }
    }
    console.log(answer);

    function aroundChange(x,y){
        lbObjField[x][y].change(); //自身
        if(x !== 0) lbObjField[x - 1][y].change(); //上
        if(x !== size - 1) lbObjField[x + 1][y].change(); //下
        if(y !== 0) lbObjField[x][y - 1].change(); //左
        if(y !== size - 1) lbObjField[x][y + 1].change(); //右
    };

    function createDiv(x,y){
        let div = document.createElement("div");
        div.className = "lightbutton off";
        div.addEventListener("click",function(){
            
            aroundChange(x,y);

            //クリア判定
            //アラート先に表示される問題未解決
            (function clearCheck(){
                let arr = [];
                for(let i = 0; i < size; i++){
                    arr.push(lbObjField[i].some(function(e){
                        if(e.state) return true;
                        else false;
                    }));
                }
                const clearTF = arr.some(function(e){
                    if(e) return true;
                    else false;
                })
                if(!clearTF) alert(`${hand + 1}手でクリア!`)
            })();

            //手数表示
            const handNode = document.getElementById("hand");
            hand++;
            handNode.value =  hand;
            handNode.innerText = hand + "手";

            //ユーザの押下状況を反映
            userTouches[x][y] = (userTouches[x][y])? 0: 1;
        },true)
        return document.getElementById("game").appendChild(div);
    }

    //ヒント
    const hint = document.getElementById("hint");
    hint.addEventListener("click",function(){
        let k = 0;
        while(k < size * size){
            i = parseInt(k / size);
            j = k % size;
            k++;            
            if(userTouches[i][j] !== answer[i][j]){
                lbObjField[i][j].dom.className = "lightbutton hint";
                break;
            }
        }
    },true)
}



