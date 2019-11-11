<template>
    <header>
        <nav class="navigation">
                <div v-for="menuItem in allMenuItems">
                    <h2>{{menuItem.title}}</h2>
                    {{menuItem}}
                </div>
            <ul v-if="allMenuItemsLoaded">

                <li v-for="menuItem in allMenuItems" :key="menuItem.id">
                    <a v-bind:href="menuItem.url">{{ menuItem.title }}</a>
                </li>
            </ul>
            <div v-else>We want to display menu items here...</div>
        </nav>
    </header>
</template>

<script>
	import {mapGetters} from "vuex";

	export default {
		computed: {
			...mapGetters({
				allMenuItems: "allMenuItems",
				allMenuItemsLoaded: "allMenuItemsLoaded"
			})
		},

		mounted() {

		}
	};

</script>
