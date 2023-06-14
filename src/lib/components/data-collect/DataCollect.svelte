<script lang="ts">
  import { fade, slide } from "svelte/transition";
  // import XMark from "../svg/XMark.svelte";
  // import { isMenuOpen } from "../../store";
  import OnconceptosLogo from "../svg/OnconceptosLogo.svelte";
  import { localUser, registrationErrorJson } from "../../store";
  import type { LocalUser } from "../../../types/series";
  import DebugData from "../debug/DebugData.svelte";
  import { registerUserVisit } from "../../utils";

  const _localUser: LocalUser = $localUser || {
    department: "",
    email: "",
    id: "",
    name: "",
    nameId: "",
  };

  async function handleClick() {
    if (!_localUser.name || !_localUser.email || !_localUser.department) {
      return;
    }

    const isDev = import.meta.env.DEV;

    console.log("isDev", isDev);

    if (isDev) {
      $localUser = _localUser;
      $registrationErrorJson = null;

      return;
    }

    try {
      await registerUserVisit(_localUser);

      $localUser = _localUser;
      $registrationErrorJson = null;
    } catch (err) {
      console.log(err);
    }
  }
</script>

<div transition:slide class="modal-wrapper">
  <OnconceptosLogo />

  <div class="fields" transition:fade>
    <label for="name"
      >Nombre:
      <input type="text" name="name" bind:value={_localUser.name} /></label
    >

    <label for="email"
      >Email:
      <input type="email" name="email" bind:value={_localUser.email} /></label
    >
    <label for="department"
      >Área:
      <input
        type="text"
        name="department"
        bind:value={_localUser.department}
      /></label
    >
    <button on:click={handleClick}>Continuar</button>
  </div>

  <div>
    <DebugData />
  </div>
  <!-- <XMark
    on:click={() => {
      $isMenuOpen = false;
    }}
  /> -->
</div>

<style>
  button {
    cursor: pointer;

    background-color: white;
    border-radius: var(--btn-border-radius);
    border: none;

    padding: 10px 20px;
    width: 100%;

    font-size: 22px;

    /* padding-left: 45px; */

    /* border-radius: 20px; */
    position: relative;

    background-color: var(--primary-color);
    color: white;
    border: 2px solid white;
  }

  div.modal-wrapper {
    width: 100vw;
    height: 100vh;

    background-color: white;

    top: 0;

    z-index: 99999;

    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 5ch;
  }

  div.fields {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    align-items: center;

    gap: 1.5ch;
    /* width: 30%; */
  }

  label {
    width: 15ch;
  }

  input {
    appearance: none;
    border-radius: 5px;
    height: var(--search-height);
    /* width: var(--search-width); */

    align-self: center;
    border: 3px solid rgba(0, 0, 0, 0.1);

    margin-right: 20px;

    padding: 5px 10px;

    padding-left: var(--input-left-padding);

    font-size: var(--font-size);
  }
</style>
