import {Injectable} from "@nestjs/common";

@Injectable()
export class AppService {
    getUsers () {
        return [
            {id: 1, name: 'Mike'},
            {id: 2, name: 'Tanya'},
        ];
    }
}