import axios from '@/lib/axiosConfig.js';
import store from "@/store";
const authenticatedUser = store.getters["auth/myAuthenticatedUser"];
console.log("menu", authenticatedUser);
let id = ''
let datax = [];
let datay = [];
export async function fetchIndicateursOptions() {
    try {
              const response = await axios.get('/indicateurs', {
              headers: {
                Authorization: `Bearer ${authenticatedUser.token}`,
                
              },
    
            });
               console.log(response.data.data);
                
               
            
            
            } catch (error) {
              console.error('errorqqqqq',error);
            
            //   if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            //     await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            //   this.$router.push("/");  //a revoir
            // }
            }
    }
 export   async function fetchStaAnnuel() {
        
          const response = await axios.get(`/indicateurs/statistics/${1}`, {
            headers: {
              Authorization: `Bearer ${authenticatedUser.token}`,
            },
          });

          const dataFromAPI = response.data.data;
          console.log('eee', dataFromAPI)
          datay = dataFromAPI.map(item => item.IntituleZone);
          datax = dataFromAPI.map(item => parseInt(item.nb));

          console.log('eee', datay)
          console.log('eee', datax)

          return { datax, datay };

        
      }
      fetchStaAnnuel(), fetchIndicateursOptions() 