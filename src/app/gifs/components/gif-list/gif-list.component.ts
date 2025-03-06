import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GifListItemComponent } from './gif-list-item/gif-list-item.component';
import Gif from '@app/gifs/interfaces/gif.interface';

@Component({
  selector: 'app-gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
  styleUrl: './gif-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListComponent {
  gifs = input.required<Gif[]>();
}
