import React from 'react';
import cl from "../../css/Style.module.css"

const Footer = () => {
    return (
      <div className={cl.footer_link} >
        <div className='flex pt-8 text-slate-300'>
        <div className="flex-1">DeFi Crystal by <a href="https://web3engineering.co.uk" className="text-primary-foreground px-4 inline-block">web3engineering</a></div>
        <div className="flex-initial">
           <a href="https://t.me/defi_crystal" className="hover: inline-block text-primary-foreground">Telegram</a>
                  &nbsp;&nbsp;
           <a href="https://discord.gg/886rCbDdg" className="hover: inline-block text-primary-foreground">Discord</a>
                  &nbsp;&nbsp;
           <a href="https://github.com/unordered-set/defi-portfolio" className="hover: inline-block text-primary-foreground">GitHub</a>
        </div>
      </div>
      </div>
      
    );
};

export default Footer;