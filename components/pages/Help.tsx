import React from 'react';
import cl from "../../css/Style.module.css"
import { Button } from '../ui/button';

const Help = ({ setHelp }: { setHelp: ((help: boolean ) => void) }) => {
    return (
        <div className={cl.help_conteiner}>
            <div className="rounded-xl max-w-5xl border bg-card text-card-foreground  opacity-90 p-4 flex flex-col">
                <Button style={{ width: 'fit-content' }} variant={'mystyle'} onClick={()=> setHelp(false)}> Закрыть </Button>

                <h1>Мы вам поможем</h1>
                <p>Здесь должна быть инструкция , и прочая инфо</p>
                <div >
                    <h2>Канал где все новости и планы на будущее, можно задать вопрос, обсудить </h2>
                    <a href="https://t.me/defi_crystal" className="hover: inline-block " >Telegram</a>
                </div>  
                <div >
                    <h2>Связь с нами через </h2> 
                    <a href="https://discord.gg/886rCbDdg" className="hover: inline-block ">Discord</a>
                </div>  
                <div>
                    <h2>Открытый код можно посмотреть здесь </h2>
                    <a href="https://github.com/unordered-set/defi-portfolio" className="hover: inline-block ">GitHub</a>
                </div>
                <h2>Группа разработчиков :</h2>
                <div>Иван Ломакин... бла... бла...</div>
                <div>Konstantin N5N... бла... бла...</div>
             </div> 
        </div>
    );
};

export default Help;