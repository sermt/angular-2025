import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { GifListComponent } from '@app/gifs/components/gif-list/gif-list.component';
import { debounceTime, filter, switchMap, tap } from 'rxjs';
import { GifService } from '@app/gifs/services/gif.service';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent, ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {
  private gifService = inject(GifService);
  searchTermControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  readonly searchTerm = toSignal(
    this.searchTermControl.valueChanges.pipe(
      debounceTime(500),
      filter((value) => typeof value === 'string'),
      switchMap(this.gifService.searchTerms),
      tap(console.log)
    ), { initialValue: [] }
  );
}
