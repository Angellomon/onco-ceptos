<script>
  import OnconceptosLogo from "./svg/OnconceptosLogo.svelte";
  import Spin from "./svg/Spin.svelte";
</script>

<section>
  <div class="content">
    <OnconceptosLogo paddingLeft={0} type="white" width={500} />
    <p>
      Toda la información que necesitas para <br /> el desarrollo de tu ejercicio
      profesional
    </p>
  </div>
  <Spin width={600} bottom={-200} right={-50} />
</section>

<style>
  section {
    width: 100%;
    min-height: 40vh;

    position: relative;
    z-index: -5;
  }

  div.content {
    color: white;

    font-size: 25px;

    margin: 50px 5vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 50%;
  }

  div.content p {
    margin: 0;
    margin-top: 40px;
  }
</style>
