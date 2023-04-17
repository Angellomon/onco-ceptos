<script lang="ts">
  import ColoredLogo from "../../../assets/logo-onconceptos_color.svg";
  import WhiteLogo from "../../../assets/logo-onconceptos_blanco.svg";

  export let type: "color" | "white" = "color";
  export let width = 150;
  export let paddingLeft = 50;
  export let alt = "onconceptos";

  let style = `padding-left: ${paddingLeft}px`;
</script>

<img {width} {style} {alt} src={type == "white" ? WhiteLogo : ColoredLogo} />
