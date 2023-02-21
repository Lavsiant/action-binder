import { Injectable } from '@angular/core';
import { Binding } from '../model/binding.model';
import { generateGuid } from '../model/common/id-generator.function';
import { StorageRepository } from './storage.repository';

@Injectable({
    providedIn: 'root'
})

export class BindingService {


    storageName = 'bindingData';
    storage: StorageRepository<Binding> = new StorageRepository<Binding>(this.storageName);

    constructor() { }

    async saveBinding(binding: Binding): Promise<void> {
        if (!binding) {
            return;
        }

        if(!binding.id) {
            binding.id = generateGuid();
        }

        await this.storage.add(binding);
    }

    async getAllBindings(): Promise<Binding[]> {
        return await this.storage.getAllData();
    }

    async deleteBinding(id: string): Promise<void> {
        await this.storage.delete(id);
    }

    async getBindingById(id: string): Promise<Binding> {
        return await this.storage.get(id);
    }

    async updateBinding(binding: Binding): Promise<void> {
        if (!binding) {
            return;
        }

        if(!binding.id) {
            binding.id = generateGuid();
        }
        
        await this.storage.update(binding);
    }


}
