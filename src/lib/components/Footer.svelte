<script>
  import FooterContent from "./footer/FooterContent.svelte";
</script>

<footer>
  <FooterContent />
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
</style>
