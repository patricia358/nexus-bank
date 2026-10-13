function mudarTela(idDaTela, botaoClicado) {
    document.querySelectorAll('.app-page').forEach(function(tela) {
        tela.classList.remove('active');
    });
    document.getElementById(idDaTela).classList.add('active');
    if (botaoClicado) {
        document.querySelectorAll('.tab-btn').forEach(function(botao) {
            botao.classList.remove('active');
        });
        botaoClicado.classList.add('active');
    }
}

// CORREÇÃO CIRÚRGICA: Removidas as linhas das caixas ausentes para o Modo Teste funcionar sempre!
function entrarComoDemonstracao() {
    document.getElementById('txt-boas-vindas').innerText = "Olá, Usuário 🧬";
    document.getElementById('txt-saldo').innerText = "R$ 2.470,50";
    document.getElementById('txt-limite').innerText = "💳 Limite: R$ 5.000,00";
    document.getElementById('box-extrato').style.display = 'block';
    document.querySelector('.phone-tabs').style.display = 'flex';
    mudarTela('tela-home', document.getElementById('btn-tab-home'));
}

function irParaFormularioCadastro() {
    mudarTela('tela-criar-conta-nova', null);
}

// CORREÇÃO CIRÚRGICA: Ajustado também o cadastro novo do celular para não travar
function finalizarCadastroNovo(event) {
    event.preventDefault();
    var nome = document.getElementById('novo-nome').value;
    document.getElementById('txt-boas-vindas').innerText = "Olá, " + nome + " 🧬";
    document.getElementById('txt-saldo').innerText = "R$ 0,00";
    document.getElementById('txt-limite').innerText = "💳 Limite: R$ 0,00 (Aguardando análise)";
    document.getElementById('box-extrato').style.display = 'none';
    document.querySelector('.phone-tabs').style.display = 'flex';
    mudarTela('tela-home', document.getElementById('btn-tab-home'));
}

function simularCartao() {
    var overlay = document.getElementById('loading');
    var res = document.getElementById('res-cartao');
    
    res.className = 'result-box';
    res.style.background = '#3a3112';
    res.style.color = '#ffcc00';
    res.style.border = '1px solid #ffcc00';
    res.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite; margin-right: 8px;">⏳</span> Analisando perfil de crédito...';
    res.style.display = 'block';
    
    overlay.style.display = 'flex';
    
    setTimeout(function() {
        overlay.style.display = 'none';
        res.className = 'result-box success';
        res.style.background = '#0f3434';
        res.style.color = '#45f3ff';
        res.style.border = '1px solid #45f3ff';
        res.innerHTML = '🎉 Limite Aprovado!<br>Cartão Nexus Black Liberado.<br>Limite: R$ 6.200,00';
    }, 3000);
}

function simularEmprestimo() {
    var val = document.getElementById('valor-emprestimo').value;
    var overlay = document.getElementById('loading');
    var res = document.getElementById('res-emprestimo');
    
    if (!val || val <= 0) {
        alert("Digite um valor válido.");
        return;
    }
    
    res.className = 'result-box';
    res.style.background = '#3a3112';
    res.style.color = '#ffcc00';
    res.style.border = '1px solid #ffcc00';
    res.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite; margin-right: 8px;">⏳</span> Calculando taxas e juros...';
    res.style.display = 'block';
    
    overlay.style.display = 'flex';
    
    setTimeout(function() {
        overlay.style.display = 'none';
        if (val > 20000) {
            res.className = 'result-box danger';
            res.style.background = '#3d1414';
            res.style.color = '#ff5c5c';
            res.style.border = '1px solid #ff5c5c';
            res.innerHTML = '❌ Crédito Recusado.<br>Valor acima do perfil.';
        } else {
            res.className = 'result-box success';
            res.style.background = '#0f3434';
            res.style.color = '#45f3ff';
            res.style.border = '1px solid #45f3ff';
            res.innerHTML = '✅ Liberado!<br>R$ ' + parseFloat(val).toLocaleString('pt-BR') + ' na conta.';
        }
    }, 3000);
}


function contratarSeguro(nomeSeguro) {
    var overlay = document.getElementById('loading');
    var res = document.getElementById('res-seguro');
    
    res.className = 'result-box';
    res.style.background = '#3a3112';
    res.style.color = '#ffcc00';
    res.style.border = '1px solid #ffcc00';
    res.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite; margin-right: 8px;">⏳</span> Ativando proteção...';
    res.style.display = 'block';
    
    overlay.style.display = 'flex';
    
    setTimeout(function() {
        overlay.style.display = 'none';
        res.className = 'result-box success';
        res.style.background = '#0f3434';
        res.style.color = '#45f3ff';
        res.style.border = '1px solid #45f3ff';
        res.innerHTML = '🛡️ Seguro ' + nomeSeguro + ' Ativado com Sucesso!';
    }, 3000);
}
function salvarCadastro(event) {
    event.preventDefault();
    alert("✅ Dados alterados!");
}

function deslogarESair() {
    document.querySelector('.phone-tabs').style.display = 'none';
    mudarTela('tela-boas-vindas', null);
    window.location.href = '/'; 
}
function aplicarInvestimento() {
    var val = document.getElementById('valor-investimento').value;
    var overlay = document.querySelector('.loading-overlay');
    var res = document.getElementById('res-investimento');
    
    if (!res) return;
    
    // Validação de segurança básica
    if (!val || val <= 0) {
        alert("Digite um valor válido para investir.");
        return;
    }
    
    // 1. Configura o visual de carregamento com a nossa ampulheta amarela giratória
    res.className = 'result-box';
    res.style.background = '#3a3112';
    res.style.color = '#ffcc00';
    res.style.border = '1px solid #ffcc00';
    res.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite; margin-right: 8px;">⏳</span> Processando investimento no CDB...';
    res.style.display = 'block';
    
    // 2. Ativa a tela preta de carregamento do celular para dar total realismo
    if (overlay) overlay.style.display = 'flex';
    
    // 3. Aguarda exatamente 3 segundos para simular a aplicação financeira real
    setTimeout(function() {
        if (overlay) overlay.style.display = 'none';
        
        // Calcula uma simulação rápida de rendimento baseado em 11% ao ano
        var rendimentoEstimado = parseFloat(val) * 1.11;
        
        // 4. Exibe a caixa verde-neon de sucesso com os dados técnicos
        res.className = 'result-box success';
        res.style.background = '#0f3434';
        res.style.color = '#45f3ff';
        res.style.border = '1px solid #45f3ff';
        res.innerHTML = '✅ Aplicação Realizada!<br>R$ ' + parseFloat(val).toLocaleString('pt-BR', {minimumFractionDigits: 2}) + ' investidos com sucesso.<br>Projeção de resgate (1 ano): R$ ' + rendimentoEstimado.toLocaleString('pt-BR', {minimumFractionDigits: 2});
    }, 3000);
}
function acionarAtalhoPix(tipo) {
    var overlay = document.querySelector('.loading-overlay');
    var res = document.getElementById('res-pix');
    
    if (!res) return;
    
    // 1. Liga o carregamento com a nossa ampulheta amarela giratória
    res.className = 'result-box';
    res.style.background = '#3a3112';
    res.style.color = '#ffcc00';
    res.style.border = '1px solid #ffcc00';
    res.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite; margin-right: 8px;">⏳</span> Processando operação...';
    res.style.display = 'block';
    
    // 2. Escurece a tela do celular com o carregamento real do sistema
    if (overlay) overlay.style.display = 'flex';
    
    // 3. Aguarda 3 segundos de simulação real
    setTimeout(function() {
        if (overlay) overlay.style.display = 'none';
        
        // 4. Ativa a barra verde-neon de sucesso
        res.className = 'result-box success';
        res.style.background = '#0f3434';
        res.style.color = '#45f3ff';
        res.style.border = '1px solid #45f3ff';
        
        // Altera a mensagem em verde dependendo do ícone que você clicou!
        if (tipo === 'pix') {
            res.innerHTML = '⚡ Área Pix ativada!<br>Chaves e QR Codes prontos para uso.';
        } else if (tipo === 'transferir') {
            res.innerHTML = '💸 TED/DOC e transferências internas liberadas com sucesso.';
        } else if (tipo === 'pagar') {
            res.innerHTML = '📄 Leitor de código de barras e boletos ativado.';
        } else if (tipo === 'cartoes') {
            res.innerHTML = '🪪 Seus cartões virtuais Nexus estão ativos e protegidos.';
        }
    }, 3000);
}
