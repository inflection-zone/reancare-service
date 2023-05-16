
import AppDownloads from '../../models/statistics/app.downloads.model';
import { AppDownloadDto } from '../../../../../domain.types/statistics/app.download.dto';

///////////////////////////////////////////////////////////////////////////////////

export class AppDownloadMapper {

    static toDto = (appDownload: AppDownloads): AppDownloadDto => {
        if (appDownload == null){
            return null;
        }
        const dto: AppDownloadDto = {
            id               : appDownload.id,
            AppName          : appDownload.AppName,
            TotalDownloads   : appDownload.TotalDownloads,
            IOSDownloads     : appDownload.IOSDownloads,
            AndroidDownloads : appDownload.AndroidDownloads,
        };
        return dto;
    };

}
