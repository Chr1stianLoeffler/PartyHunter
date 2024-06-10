<script>
  import '../app.postcss';
  import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <a href="/" class="btn btn-primary text-xl uppercase font-bold">Party-Hunter</a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <a class="btn btn-primary text-xl uppercase font-bold" href="/events">Events</a>
        <a class="btn btn-primary text-xl uppercase font-bold" href="/events/new">Neues Event erstellen</a> <!-- Neuer Link hinzugefügt -->
        <a class="btn btn-primary text-xl uppercase font-bold" href="https://discord.gg/EXqV7W8MtY" target="_blank" rel="noreferrer">Discord</a>
        <a class="btn btn-primary text-xl uppercase font-bold" href="/login" target="_blank" rel="noreferrer">Login</a>
        <a class="btn btn-primary text-xl uppercase font-bold" href="https://github.com/skeletonlabs/skeleton" target="_blank" rel="noreferrer">GitHub</a>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <slot />
</AppShell>
