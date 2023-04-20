<script>
  import OnconceptosLogo from "./svg/OnconceptosLogo.svelte";
</script>

<footer>
  <OnconceptosLogo type="color" width={200} />

  <ul>
    <li>
      <a href="#"> Política de Privacidad </a>
    </li>

    <li>
      <a href="#"> Aviso de Privacidad </a>
    </li>

    <li>
      <a href="#"> Términos y Condiciones </a>
    </li>
  </ul>

  <div class="footer">
    <p>D.R. © 2022 Merck & Co., Inc., Rahway, N.J., E.U.A. y sus afiliadas.</p>
    <p>
      Todos los derechos reservados. Prohibida su reproducción parcial o total.
    </p>
    <p>Merck Sharp & Dohme Comercializadora, S. de R.L. de C.V.</p>
    <p>
      Av. San Jerónimo 369, Col. La Otra Banda, C.P. 01090, Ciudad de México.
    </p>
    <br />
    <p>
      El contenido de este sitio es para uso exclusivo de profesionales de la
      salud en México.
    </p>
  </div>
</footer>

<style>
  footer {
    background-color: white;

    min-height: 25vh;
    height: 20%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    padding: 30px 20px;

    justify-content: space-evenly;
    align-items: flex-start;
  }

  ul {
    list-style-type: none;
  }

  ul li a {
    color: var(--secondary-color);
  }

  ul li a:hover {
    color: var(--primary-color);
  }

  div.footer {
    color: var(--dark-background);
  }

  div.footer p {
    margin-bottom: 0;
    margin-top: 5px;
  }
</style>
