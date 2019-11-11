<template>
    <div>
        <template v-if="allCakesLoaded">
            <h1>{{ cakeContent.title.rendered }}</h1>
            <div v-html="cakeContent.content.rendered"></div>
        </template>
        <Loader v-else/>
    </div>
</template>

<script>
	import Loader from "../partials/Loader.vue";
	import { mapGetters } from "vuex";

	export default {
		computed: {
			...mapGetters({
				cake: "cake",
				allCakesLoaded: "allCakesLoaded"
			}),

			cakeContent() {
				return this.cake(this.$route.params.cakeSlug);
			}
		},

		components: {
			Loader
		}
	};
</script>
