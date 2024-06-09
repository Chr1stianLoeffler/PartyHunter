
<script>

</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-10 text-center flex flex-col items-center">
    <h2 class="text-2xl font-bold">Willkommen bei</h2>
    <figure class="relative w-64 h-64 md:w-80 md:h-80">
      <div class="bg-effect absolute top-0 left-0 w-full h-full rounded-full blur-[50px] transition-all z-[-1]"></div>
      <img src="/PartyHunterLogo.png" alt="Party Hunter Logo" class="w-full h-full object-cover">
    </figure>
    <div class="flex justify-center space-x-2">
      <a class="btn variant-filled" href="https://skeleton.dev/" target="_blank" rel="noreferrer">
        Entdecke neue Events und Partys in deiner Nähe!
      </a>
    </div>
    <div class="space-y-2">
      
      <a class="btn glass" href="registrieren">Jetzt Registrieren</a>
      
    </div>
  </div>
</div>

<style>
  .container {
    height: 100vh; /* Vollbild Container */
  }

  .bg-effect {
    background: linear-gradient(270deg, #fd749b, #281ac8);
    animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, glow 5s linear infinite;
  }

  @keyframes glow {
    0% {
      background-color: #fd749b;
    }
    33% {
      background-color: #281ac8;
    }
    66% {
      background-color: #ffcc70;
    }
    100% {
      background-color: #fd749b;
    }
  }

  @keyframes pulse {
    50% {
      transform: scale(1.5);
    }
  }
</style>
