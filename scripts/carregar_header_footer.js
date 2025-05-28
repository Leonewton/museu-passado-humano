const conteudo_header = `
      <a href="#" class="item1"
        ><img src="imagens/logo-branca.png" alt="logo-cabecalho"
      /></a>

      <nav class="item2">
        <a href="home.html">HOME</a>
        <a href="noticias.html">NOTÍCIAS</a>
        <a href="publicacoes.html">PUBLICAÇÕES</a>
        <a href="civilizacoes-antigas.html">CIVILIZAÇÕES ANTIGAS</a>
        <a href="revolucao-industrial.html">REVOLUÇÃO INDUSTRIAL</a>
        <a href="era-digital.html">ERA DIGITAL</a>
        <a href="fale-conosco.html">FALE CONOSCO</a>
        <a href="login.html">AGENDAR VISITA</a>
      </nav>
`

const conteudo_footer = `
      <div class="container">
        <div class="newsletter">
          <h3>
            VAMOS EXPLORAR A HISTÓRIA JUNTOS. ENVIE-ME ATUALIZAÇÕES DA
            NEWSLETTER.
          </h3>
          <form onsubmit="cadastrarNewsletter(event)">
            <input
              required
              type="email"
              name="email"
              id="email-footer"
              placeholder="Digite o e-mail"
            />
            <input type="submit" id="submit-footer" value="ENVIAR"/>
          </form>
          <p>
            Ao se inscrever em nossa newsletter, você poderá receber,
            ocasionalmente, pesquisas e comunicações com conteúdos temáticos do
            Museu Passado Humano por e-mail. Ao prosseguir, você declara estar
            ciente e de acordo com o uso das suas informações conforme descrito
            em nossa Política de Privacidade. Você pode cancelar sua inscrição a
            qualquer momento, clicando no botão "Cancelar assinatura" na parte
            inferior de qualquer e-mail enviado pelo Museu Passado Humano.
          </p>
        </div>
        <div class="logo-rodape">
          <img src="imagens/logo-branca.png" alt="logo-rodape" />
        </div>
      </div>
      <div class="copyright">
        <p>© 2025 Museu Passado Humano. Todos os direitos reservados.</p>
      </div>
`

const modo_tema = `
      <div id="darkModeToggle">
            <button id="modeSwitchBtn" class="btn btn-light rounded-circle shadow" title="Alternar modo">
			<i id="modeIcon" class="bi bi-moon-fill fs-4"></i>
		</button>
	</div>
`

const footer = document.getElementById("footer")
const header = document.getElementById("header");
const modo = document.getElementById("modo-tema");

header.innerHTML = conteudo_header;
footer.innerHTML = conteudo_footer;
modo.innerHTML = modo_tema;
