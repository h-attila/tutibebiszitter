<?php

namespace App\Service;

use App\Entity\Profile;
use App\Entity\Status;
use DateTime;

class StatusService
{
    protected string $expire = 'P2W';        // két hét

    protected string $status = '';
    protected bool $enabled = false;
    protected string $id = '0';
    protected string $color = 'danger';
    protected string $icon = 'HelpOutlineIcon';

    protected array $colors = [
      'orange' => '#ff6e40',
      'green' => '#69f0ae',
      'red' => '#dd3333',
      'deepOrange' => '#ff6e40'
    ];

    /**
     * Frissítjük a profikhoz tartozó státusz objektumot.
     *
     * @param Profile $profile
     * @return Status
     */
    public function set(Profile $profile): Status
    {
        $now = new DateTime();
        try {
            $expireWarning = (new DateTime())->add(new \DateInterval($this->expire));
        } catch (\Exception $exception) {
            throw new \RuntimeException('Dátum intervallum beállítása hibás.');
        }

        if (!is_null($profile->getRegStart()) && !is_null($profile->getRegEnd())) {

            // aktív - inaktív
            if ($profile->getEnabled()) {
                if ($profile->getRegStart() > $now && $profile->getRegEnd() > $now) {
                    $this->status = 'Új tag, jóváhagyott';
                    $this->enabled = false;
                    $this->id = '1';
                    $this->color = 'orange';        // orange
                    $this->icon = 'HourglassEmptyIcon';

                } else if ($profile->getRegStart() < $now && $profile->getRegEnd() > $now) {
                    $this->status = 'Aktív';
                    $this->enabled = true;
                    $this->id = '2';
                    $this->color = 'green';
                    $this->icon = 'CheckCircleIcon';

                    if (!$profile->getActive()) {
                        $this->status .= ', szünetel';
                        $this->id .= 'sz';
                        $this->color = 'orange';
                        $this->icon = 'PauseCircleFilledIcon';

                    }

                } else if ($profile->getRegStart() < $now && $profile->getRegEnd() < $now) {
                    $this->status = 'Inaktív, lejárt';
                    $this->enabled = false;
                    $this->id = '3';
                    $this->color = 'red';
                    $this->icon = 'SentimentVeryDissatisfiedIcon';

                }

            } elseif ($profile->getEnabled() === false) {

                if ($profile->getRegStart() > $now && $profile->getRegEnd() > $now) {
                    $this->status = 'Új tag, jóváhagyásra vár';
                    $this->enabled = false;
                    $this->id = '4';
                    $this->color = 'orange';
                    $this->icon = 'HourglassEmptyIcon';

                } else if ($profile->getRegStart() < $now && $profile->getRegEnd() > $now) {
                    $this->status = 'Inaktív, nem jóváhagyott';
                    $this->enabled = false;
                    $this->id = '5';
                    $this->color = 'red';
                    $this->icon = 'PauseCircleFilledIcon';

                } else if ($profile->getRegStart() < $now && $profile->getRegEnd() < $now) {
                    $this->status = 'Inaktív, lejárt';
                    $this->enabled = false;
                    $this->id = '6';
                    $this->color = 'red';
                    $this->icon = 'SentimentVeryDissatisfiedIcon';
                }
            }

            // kiemelt
            if ($profile->getHighlighted() !== '' && $profile->getHighlighted() > $now) {
                $this->status .= ', kiemelt';
                $this->id .= '7';
                $this->color = 'green';
                $this->icon = 'FavoriteIcon';
            }

            // hamarosan lejár
            if ($profile->getRegEnd() !== '' && $profile->getRegEnd() > $now && $profile->getRegEnd() < $expireWarning) {
                $this->status .= ', hamarosan lejár';
                $this->id .= '8';
                $this->color = 'deepOrange';
                $this->icon = 'AvTimerIcon';
            }

            // módosult
            if ($profile->getModified() === true) {
                $this->status .= ', módosult';
                $this->id .= 'm';
                $this->icon = 'EditIcon';
            }

        } else {

            $this->status = 'Új tag, jóváhagyásra vár';
            $this->enabled = false;
            $this->id = '9';
            $this->color = 'orange';       // orange
            $this->icon = 'HourglassEmptyIcon';
        }

        $status = new Status;
        $status
          ->setEnabled($this->enabled)
          ->setText($this->status)
          ->setCode($this->id)
          ->setColor($this->parseColors($this->color))
          ->setIcon($this->icon)
          ->setCreated(new DateTime());

        return $status;
    }

    protected function parseColors(string $colorCode)
    {
        return $this->colors[$colorCode] ?? $this->colors['deepOrange'];
    }
}