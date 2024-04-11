//criando os arrays com os espaços para jogar
let square = {
    a1:'', a2:'', a3:'',
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''
}
let player = '';
let warning = '';
let playing = false;
reset();
//event
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});
// functions
function itemClick(event){
    let item = event.target.getAttribute('data-item');    //pegar o item clicado
    if(playing && square[item] === ''){
        square[item] = player; //aplicar o valor do player no item clicado
        renderSquare(); // função para aplicar ao local clicado o valor do jogador em turno
        togglePlayer(); // função para alternar o turno do jogador x e o.

    }
}
function reset(){
    warning = '';
    
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x': 'o';

    for(let i in square){
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}
function renderSquare(){//função para mostrar na tela a jogada do jogador X ou O
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];    
    }
    gameCheck();
}
function renderInfo(){ 
    document.querySelector('.vez').innerHTML = player;//Mostra quem está no turno para jogar
    document.querySelector('.resultado').innerHTML = warning;//mostra quem é o vencedor
}

function togglePlayer(){//função para trocar a vez dos jogadores
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}
function gameCheck(){//função para verificar se o jogo está acabado ou não
    if(checkWinnerFor('x')){//checa se o jogador x preencheu os arrays da variavel possib
        warning = 'O "x" venceu';
        playing = false;
    } else if(checkWinnerFor('o')){//checa se o jogador o preencheu os arrays da variavel possib
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()){// se nenhum dos jogadores preencheram retorna o empate
        warning = 'Deu empate';
        playing = false;
    }
}
function checkWinnerFor(player){// cria os arrays com as condições de vitoria
    let possib = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for(let i in possib){
        let pArray = possib[i].split(','); // array com as possibilidades
        let hasWon = pArray.every((option)=> square[option] === player);// percorre o array verificando as opções de vitoria
        if(hasWon){
            return true;
        }
    }
    return false;//caso passe pelo for inteiro e não tenha condição vitoria, retorna false
}
function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }
    return true;
}