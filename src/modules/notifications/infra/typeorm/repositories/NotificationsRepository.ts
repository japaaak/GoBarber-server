// src\modules\notifications\infra\typeorm\repositories\NotificationsRepository.ts
import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notifications = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notifications);

    return notifications;
  }
}

export default NotificationsRepository;
