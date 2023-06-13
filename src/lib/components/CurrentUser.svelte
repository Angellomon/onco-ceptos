<script lang="ts">
  import { currentUser } from "../store";
  import userSolidSrc from "../../assets/user-solid.svg";

  let hover = false;
  export let border = true;

  function handleMouseOver() {
    hover = true;
  }

  function handleMouseLeave() {
    hover = false;
  }

  function _default() {}

  $: style = border
    ? `border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;`
    : "";
</script>

<div
  on:mouseover={handleMouseOver}
  on:mouseleave={handleMouseLeave}
  on:keypress={_default}
  on:focus={_default}
  {style}
>
  <span>
    <img src={userSolidSrc} alt="user" class:hover />
  </span>

  <span>
    Hola {$currentUser.name}
  </span>
</div>

<style>
  div {
    --submenu-border-radius: 20px;
    --submenu-border: 1px solid white;
    --submenu-bottom-offset: -160%;
    /* --submenu-bottom-offset: -115%; */
    --submenu-right-offset: 0px;

    --select-button-width: 200px;
    --submenu-select-width: 160px;
    --font-size: 20px;

    align-self: center;
    justify-self: center;

    text-align: center;
    align-self: center;

    position: relative;

    padding: 0 15px;
    margin-right: 10px;

    cursor: pointer;

    background-color: white;

    font-size: var(--font-size);
    color: var(--secondary-color);

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 40%;
  }

  img {
    height: 16px;
    width: auto;
    transition: all 0.2s ease-in-out;
    margin-right: 10px;

    filter: invert(9%) sepia(95%) saturate(866%) hue-rotate(184deg)
      brightness(97%) contrast(97%);
  }

  img.hover {
    transform: scale(1.2);
  }

  @media screen and (max-width: 1300px) {
    div {
      height: 55%;
    }
  }
</style>
