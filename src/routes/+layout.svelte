<script>
  import '../app.postcss';
  import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <a href="/" class="btn btn-primary text-xl uppercase font-bold">
          <img src="/PartyHunterLogo.png" style="width: 100px; height: auto;" alt="PartyHunterLogo">
        </a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <a class="btn btn-primary text-xl uppercase font-bold" href="/events">Events</a>
        <a class="btn btn-primary text-xl uppercase font-bold" href="/events/new">Neues Event erstellen</a> 
        <a class="btn btn-primary text-xl uppercase font-bold" href="https://github.com/Chr1stianLoeffler/PartyHunter" target="_blank" rel="noreferrer">GitHub</a>
        <a class="btn btn-primary text-xl uppercase font-bold" href="/login" rel="noreferrer">Login</a>
        <a class="btn btn-primary text-xl uppercase font-bold" href="/registrieren" rel="noreferrer">Registrieren</a>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <slot />
</AppShell>
