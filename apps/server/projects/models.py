from django.db import models
from django.utils.translation import gettext_lazy as _


class Project(models.Model):
    name = models.CharField(_("Name"), max_length=150)
    description = models.TextField(_("Description"), max_length=256, blank=True, null=True)
    creatorId = models.CharField(_("Creator ID"), max_length=225)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.creatorId}"