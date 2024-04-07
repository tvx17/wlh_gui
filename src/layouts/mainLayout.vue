<script lang="ts" setup>
import cReleasesDialog from 'src/components/releasesDialog.vue';
import cNewReleaseDialog from 'src/components/newReleaseDialog.vue';
import { useWLH } from 'src/WLH';
import { onMounted, ref } from 'vue';

const wlh = useWLH();

const leftDrawerOpen = ref(false);
const releaseDialogOpen = ref(false);
const newsDialogOpen = ref(false);



function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
onMounted(() => {
  if (!localStorage.getItem('firstStart')) {
    newsDialogOpen.value = true;
    localStorage.setItem('firstStart', 'true');
  }
});

</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!--        <q-btn
                  aria-label="Menu"
                  dense
                  flat
                  icon="menu"
                  round
                  @click="toggleLeftDrawer"
                />-->

        <q-btn v-if="$q.screen.gt.xs" class="q-ml-xs" flat no-caps no-wrap>
          <q-toolbar-title class="text-weight-bold" shrink @click="releaseDialogOpen = true">
            WLH
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <!--        <div class="YL__toolbar-input-container row no-wrap">
                  <q-input v-model="search" class="bg-white col" dense outlined placeholder="Search" square />
                  <q-btn class="YL__toolbar-input-btn" color="grey-3" icon="search" text-color="grey-8" unelevated />
                </div>-->

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn dense flat icon="fa-solid fa-grip-vertical" round>
            <q-popup-proxy>
              <div class="q-pa-md">
                <div class="text-caption text-grey-6">Structure</div>
                <div class="row">
                  <q-btn :to="{name:'books', params:{id:0}}" class="col" flat icon="fa-solid fa-book" label="Books" />
                  <q-btn :to="{name:'chapters', params:{id:0}}" class="col" flat icon="fa-solid fa-layer-group"
                         label="Chapters" />
                  <q-btn :to="{name:'scenes', params:{id:0}}" class="col" flat icon="fa-solid fa-file-pen"
                         label="Scenes" />
                </div>
                <q-separator />
                <div class="text-caption text-grey-6">Contents</div>
                <div class="row">
                  <q-btn disable flat icon="fa-solid fa-person" label="Characters">
                    <q-tooltip>Coming soon</q-tooltip>
                  </q-btn>
                  <q-btn disable flat icon="fa-solid fa-cube" label="Objects">
                    <q-tooltip>Coming soon</q-tooltip>
                  </q-btn>
                  <q-btn disable flat icon="fa-solid fa-location-dot" label="Locations">
                    <q-tooltip>Coming soon</q-tooltip>
                  </q-btn>
                </div>
                <q-separator />
                <div class="text-caption text-grey-6">Misc</div>
                <div class="row">
                  <q-btn disable flat icon="fa-solid fa-link" label="Relations">
                    <q-tooltip>Coming soon</q-tooltip>
                  </q-btn>
                  <q-btn disable flat icon="fa-solid fa-bookmark" label="Storylines">
                    <q-tooltip>Coming soon</q-tooltip>
                  </q-btn>
                </div>

              </div>
            </q-popup-proxy>
          </q-btn>
          <!--          <q-btn dense flat icon="notifications" round>
                      <q-badge color="red" floating text-color="white">
                        2
                      </q-badge>
                      <q-tooltip>Notifications</q-tooltip>
                    </q-btn>-->
          <q-btn flat icon="fa-solid fa-gear" round>
            <q-menu auto-close style="min-width: 300px">
              <q-list dense>
                <q-item clickable disable>
                  <q-item-section avatar>
                    <q-icon name="fa-solid fa-user" size="xs" />
                  </q-item-section>
                  <q-item-section>
                    Profile
                  </q-item-section>
                  <q-tooltip>Coming soon</q-tooltip>
                </q-item>
                <q-separator />
                <q-item :to="{name:'projects', params:{id:0}}" clickable>
                  <q-item-section avatar>
                    <q-icon name="fa-solid fa-folder" size="xs" />
                  </q-item-section>
                  <q-item-section>Projects</q-item-section>
                </q-item>
                <q-item :to="{name:'users', params:{id:0}}" clickable>
                  <q-item-section avatar>
                    <q-icon name="fa-solid fa-users" size="xs" />
                  </q-item-section>
                  <q-item-section>Users</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable disable>
                  <q-item-section avatar>
                    <q-icon name="fa-solid fa-cog" size="xs" />
                  </q-item-section>
                  <q-item-section>Settings</q-item-section>
                  <q-tooltip>Coming soon</q-tooltip>
                </q-item>
                <q-separator />
                <q-item clickable :href="'https://tvx17.github.io'" target="_blank">
                  <q-item-section avatar>
                    <q-icon name="fa-solid fa-info" size="xs" />
                  </q-item-section>
                  <q-item-section>Help</q-item-section>
                  <q-tooltip>Coming soon</q-tooltip>
                </q-item>
                <q-separator />
                <q-item clickable disable>
                  <q-item-section avatar>
                    <q-icon name="fa-solid fa-right-from-bracket" size="xs" />
                  </q-item-section>
                  <q-item-section>Exit</q-item-section>
                  <q-tooltip>Coming soon</q-tooltip>
                </q-item>

              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <!--    <q-drawer
          v-model="leftDrawerOpen"
          bordered
          show-if-above
        >
        </q-drawer>-->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <c-releases-dialog :dialog-open="releaseDialogOpen" @on:closeDialog="releaseDialogOpen = false"/>
  <c-new-release-dialog :dialog-open="newsDialogOpen" @on:closeDialog="newsDialogOpen = false"/>

</template>


