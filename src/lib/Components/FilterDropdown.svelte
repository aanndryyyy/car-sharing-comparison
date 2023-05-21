<script lang="ts">
    import {clickOutside} from 'svelte-use-click-outside';
    import {Icon, ChevronDown} from 'svelte-hero-icons'
    import { cheapestFirst } from '$lib/Store/FilterStore'

    let showDropdown: boolean = false
    export let items = []

</script>

<div>
    <button
            class="flex items-center gap-1 text-sm font-medium text-slate-600"
            on:click={() => showDropdown = !showDropdown}>
        <p>
            {#if $cheapestFirst}
                Cheapest first
            {:else }
                Closest first
            {/if}
        </p>
        <Icon src={ChevronDown} size="20"/>
    </button>


    {#if showDropdown}
        <div class="absolute bg-white w-36 border rounded p-2 grid gap-2" use:clickOutside={() => {
    showDropdown = false
		   }}>
            <div class="flex gap-2" on:click={() => {$cheapestFirst = true; showDropdown = false}}>
                <p class="cursor-pointer">
                    Cheapest first
                </p>
            </div>
            <div class="flex gap-2" on:click={() => {$cheapestFirst = false; showDropdown = false}}>
                <p class="cursor-pointer">
                    Closest first
                </p>
            </div>
        </div>
    {/if}
</div>