import{GetDetailData} from './api.js'

//routing
export function routing(){
    routie({
        'overview': () => {
        overview();
        },
        '/:id': (id) => {
          GetDetailData(id);
        }
    });
  }