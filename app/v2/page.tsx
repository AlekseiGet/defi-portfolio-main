"use client";

import { useState } from "react";
import { PrivateKeyAccount } from "viem";
import ImportWalletsDialog from '@/components/controls/importwalletsdialog'
import PortfolioManager from '@/components/controls/portfoliomanager'

export default function V2() {
    const [wallets, setWallets] = useState<PrivateKeyAccount[]>([]);  
    
    return (
        <main className="flex min-h-screen flex-col overflow-hidden relative">
            {wallets.length === 0
                ? (<ImportWalletsDialog setWallets={setWallets} />)
                : (<PortfolioManager wallets={wallets} setWallets={setWallets} />)}
        </main>
    )
}
