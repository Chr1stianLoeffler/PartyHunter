<script lang="ts">
    import { browser } from '$app/environment';
    if(browser){
        const username = sessionStorage.getItem("username")
        const token = sessionStorage.getItem("jwt")
    }
</script>